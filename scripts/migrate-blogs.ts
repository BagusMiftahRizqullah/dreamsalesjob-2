import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load env variables manually since this is a standalone script
dotenv.config({ path: '.env.local' });
if (!process.env.MONGODB_URI) {
  dotenv.config({ path: '.env' });
}

const MONGODB_URI = process.env.MONGODB_URI!;

const BlogSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String, default: '' },
    content: { type: String, required: true },
    image: { type: String, default: '' },
    category: { type: String, default: 'General' },
    author: { type: String, default: 'Team DSJ' },
    date: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

async function migrateBlogs() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    const postsDirectory = path.join(process.cwd(), 'content/blog');
    if (!fs.existsSync(postsDirectory)) {
      console.log('No blog directory found. Exiting.');
      return;
    }

    const fileNames = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.mdx'));
    console.log(`Found ${fileNames.length} blog posts to migrate.`);

    for (const fileName of fileNames) {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const htmlContent = marked(content);

      const blogData = {
        slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        content: htmlContent,
        image: data.image || '',
        category: data.category || 'General',
        author: data.author || 'Team DSJ',
        date: data.date ? new Date(data.date) : new Date(),
        isActive: true,
      };

      await Blog.findOneAndUpdate({ slug }, blogData, { upsert: true, new: true });
      console.log(`Migrated: ${slug}`);
    }

    console.log('Migration completed successfully.');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

migrateBlogs();
