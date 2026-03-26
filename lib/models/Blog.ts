import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: Date;
  isActive: boolean;
}

const BlogSchema: Schema = new Schema(
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

const Blog = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
