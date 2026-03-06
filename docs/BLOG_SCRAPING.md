
# Blog Scraping and Integration Guide

This guide details the automated blog scraping solution for `dreamsalesjobs.com/blog/`. The system fetches content, transforms it into MDX, and integrates it directly into the Next.js application.

## Overview

-   **Source**: `https://dreamsalesjobs.com/blog/`
-   **Destination**: `content/blog/*.mdx`
-   **Images**: `public/images/blog/`
-   **Format**: MDX with frontmatter (title, date, author, category, image).

## Prerequisites

Ensure you have the following dependencies installed:

```bash
npm install cheerio turndown
```

## How to Run

### 1. Run the Scraper

To fetch the latest blog posts and update the content directory:

```bash
node scripts/scrape-blog.js
```

This script will:
1.  Fetch the main blog listing page.
2.  Discover all article links.
3.  For each article:
    -   Download the featured image to `public/images/blog/`.
    -   Extract metadata (title, date, author, category).
    -   Convert HTML content to Markdown (cleaning up unnecessary elements).
    -   Save the file as `content/blog/[slug].mdx`.

### 2. Verify Integrity

To ensure all scraped content is valid and links are working:

```bash
node scripts/test-blog-integrity.js
```

This checks for:
-   Valid frontmatter structure.
-   Existence of referenced images.
-   Content length validity.

## Deployment & Maintenance

### Deployment

The scraper is designed to be run **locally** or in a **CI/CD pipeline** before the build step. It generates static files that are committed to the repository.

**Recommended Workflow:**
1.  Run `node scripts/scrape-blog.js` locally.
2.  Review changes (git diff).
3.  Commit and push to trigger a deployment.

### Maintenance

-   **Selector Updates**: If the source website changes its layout (e.g., class names change from `.elementor-widget-theme-post-content` to something else), update the selectors in `scripts/scrape-blog.js`.
-   **Image Handling**: Currently, images are downloaded to `public/images/blog`. Ensure this directory is not ignored by git if you want to host them, or use an external storage solution if the site scales.

### Synchronization Strategy

To keep content in sync:
-   **Manual**: Run the script weekly or when new content is published.
-   **Automated**: Set up a GitHub Action to run the scraper on a schedule (cron job), commit the changes, and push back to the repo.

## Error Handling

The scraper uses a `try-catch` block for each article. If one article fails to download or parse, the script logs the error and continues to the next one. Check the console output for any `Error processing...` messages.
