
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOG_DIR = path.join(process.cwd(), 'content/blog');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

function testBlogIntegrity() {
    console.log('Starting blog integrity check...');
    
    if (!fs.existsSync(BLOG_DIR)) {
        console.error('FAIL: Blog directory content/blog does not exist.');
        return;
    }

    const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.mdx'));
    console.log(`Found ${files.length} MDX files.`);
    
    let errors = 0;

    files.forEach(file => {
        const filePath = path.join(BLOG_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        try {
            const { data, content: markdown } = matter(content);
            
            // Check Required Frontmatter
            const requiredFields = ['title', 'date', 'author', 'category'];
            requiredFields.forEach(field => {
                if (!data[field]) {
                    console.error(`FAIL: ${file} missing required field: ${field}`);
                    errors++;
                }
            });

            // Check Image
            if (data.image) {
                const imagePath = path.join(PUBLIC_DIR, data.image);
                if (!fs.existsSync(imagePath)) {
                    console.error(`FAIL: ${file} references missing image: ${data.image}`);
                    errors++;
                }
            } else {
                console.warn(`WARN: ${file} has no image set.`);
            }

            // Check Content
            if (!markdown || markdown.trim().length < 50) {
                console.warn(`WARN: ${file} has very short content (<50 chars).`);
            }

        } catch (e) {
            console.error(`FAIL: Error parsing ${file}: ${e.message}`);
            errors++;
        }
    });

    if (errors === 0) {
        console.log('SUCCESS: All blog posts passed integrity checks.');
    } else {
        console.error(`FAIL: Found ${errors} errors during integrity check.`);
        process.exit(1);
    }
}

testBlogIntegrity();
