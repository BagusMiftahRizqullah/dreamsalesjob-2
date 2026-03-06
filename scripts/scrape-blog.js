
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const TurndownService = require('turndown');
const https = require('https');

const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced'
});

// Configure turndown to ignore scripts, styles, etc.
turndownService.remove(['script', 'style', 'iframe', 'form', 'nav', 'footer', 'header']);

const BLOG_DIR = path.join(process.cwd(), 'content/blog');
const IMAGE_DIR = path.join(process.cwd(), 'public/images/blog');

// Ensure directories exist
if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });
if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-');  // Replace multiple - with single -
}

async function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        if (!url) {
            resolve(null);
            return;
        }
        
        // Handle data URLs or relative URLs if necessary (skipping for now, assuming absolute)
        if (!url.startsWith('http')) {
            resolve(null);
            return;
        }

        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                fs.unlink(filepath, () => {}); // Delete failed file
                resolve(null); // Resolve null to not break flow
                return;
            }
            
            response.pipe(file);
            file.on('finish', () => {
                file.close(() => resolve(filepath));
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => {});
            resolve(null); // Log error but continue
        });
    });
}

async function fetchArticle(url) {
    console.log(`Fetching: ${url}`);
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
        return await res.text();
    } catch (e) {
        console.error(`Error fetching ${url}:`, e.message);
        return null;
    }
}

async function scrape() {
    console.log('Starting blog scraper...');
    
    // 1. Get List of Articles
    const mainUrl = 'https://dreamsalesjobs.com/blog/';
    const mainHtml = await fetchArticle(mainUrl);
    if (!mainHtml) return;

    const $ = cheerio.load(mainHtml);
    const articleLinks = [];
    
    // Strategy to find links (same as inspection script)
    $('article a').each((i, el) => {
        const href = $(el).attr('href');
        if (href && !articleLinks.includes(href) && !href.includes('/category/') && !href.includes('/author/')) {
            articleLinks.push(href);
        }
    });

    if (articleLinks.length === 0) {
        // Fallback strategy
         $('a').each((i, el) => {
            const href = $(el).attr('href');
            if (href && href.startsWith('https://dreamsalesjobs.com/') && href.length > 35 && !href.includes('/category/') && !href.includes('/author/') && !href.includes('/page/') && !href.includes('/tag/')) {
                 if (!articleLinks.includes(href)) articleLinks.push(href);
            }
        });
    }

    console.log(`Found ${articleLinks.length} articles.`);

    // 2. Process Each Article
    for (const link of articleLinks) {
        try {
            const html = await fetchArticle(link);
            if (!html) continue;

            const $post = cheerio.load(html);

            // Extract Metadata
            let title = $post('.elementor-heading-title').first().text().trim();
            if (!title) title = $post('h1').first().text().trim();
            if (!title) title = $post('.entry-title').text().trim();
            if (!title) title = $post('title').text().replace('| Dream Sales Jobs', '').trim();

            const slug = slugify(title);
            
            // Date
            let date = $post('meta[property="article:published_time"]').attr('content');
            if (date) date = date.split('T')[0]; // Format YYYY-MM-DD
            if (!date) {
                // Try finding text date
                const dateText = $post('.elementor-post-info__item--type-date').text().trim();
                if (dateText) {
                    // Simple parse attempt, or default to today if complex
                    date = new Date(dateText).toISOString().split('T')[0];
                }
            }
            if (!date || date === 'Invalid Date') date = new Date().toISOString().split('T')[0];

            // Author
            let author = $post('.elementor-post-info__item--type-author').text().trim();
            if (!author) author = $post('meta[name="author"]').attr('content');
            if (!author) author = 'Team DSJ';

            // Category
            let category = $post('meta[property="article:section"]').attr('content') || 'General';

            // Image
            const imageUrl = $post('meta[property="og:image"]').attr('content');
            let localImagePath = '';
            if (imageUrl) {
                const ext = path.extname(imageUrl).split('?')[0] || '.jpg';
                const imageFilename = `${slug}${ext}`;
                const imagePath = path.join(IMAGE_DIR, imageFilename);
                
                console.log(`Downloading image: ${imageUrl} -> ${imageFilename}`);
                await downloadImage(imageUrl, imagePath);
                localImagePath = `/images/blog/${imageFilename}`;
            }

            // Content
            // Remove lazy load placeholders and other unwanted elements
            $post('.elementor-widget-theme-post-content img[src^="data:"]').remove();
            $post('.entry-content img[src^="data:"]').remove();

            let contentHtml = $post('.elementor-widget-theme-post-content').html();
            if (!contentHtml) contentHtml = $post('.entry-content').html();
            
            if (!contentHtml) {
                console.warn(`No content found for ${link}`);
                continue;
            }

            // Convert to Markdown
            const markdown = turndownService.turndown(contentHtml);

            // Create MDX Content
            const mdxContent = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${date}"
excerpt: "${$post('meta[name="description"]').attr('content') || ''}"
author: "${author}"
category: "${category}"
image: "${localImagePath}"
---

${markdown}
`;

            // Save File
            const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
            fs.writeFileSync(filePath, mdxContent);
            console.log(`Saved: ${slug}.mdx`);

        } catch (error) {
            console.error(`Error processing ${link}:`, error);
        }
    }
    
    console.log('Scraping completed!');
}

scrape();
