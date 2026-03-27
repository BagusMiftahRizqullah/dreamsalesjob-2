import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { list } from '@vercel/blob';

// Ensure this route is evaluated dynamically, especially when reading env vars
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check if we are in production environment
    const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';

    // If Vercel Blob is configured OR we are in production
    if (process.env.BLOB_READ_WRITE_TOKEN || isProduction) {
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        console.error('Missing BLOB_READ_WRITE_TOKEN in production environment.');
        // Return empty array instead of failing, so the UI doesn't crash, 
        // but log the error so we know it's missing.
        return NextResponse.json({ images: [] });
      }

      try {
        const { blobs } = await list({ prefix: 'blog/' });
        
        const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const imageFiles = blobs.filter(blob => {
          const ext = path.extname(blob.pathname).toLowerCase();
          return validExtensions.includes(ext);
        });

        const filesWithStats = imageFiles.map(blob => ({
          name: path.basename(blob.pathname),
          url: blob.url,
          mtime: new Date(blob.uploadedAt).getTime()
        }));

        filesWithStats.sort((a, b) => b.mtime - a.mtime);
        return NextResponse.json({ images: filesWithStats });
      } catch (blobError) {
        console.error('Error reading from Vercel Blob:', blobError);
        return NextResponse.json({ error: 'Failed to fetch images from cloud storage' }, { status: 500 });
      }
    }

    // Fallback for local development
    const dirPath = path.join(process.cwd(), 'public/blog');
    
    // Check if directory exists
    try {
      await fs.access(dirPath);
    } catch {
      // Return empty array if directory doesn't exist
      return NextResponse.json({ images: [] });
    }

    const files = await fs.readdir(dirPath);
    
    // Filter only image files
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return validExtensions.includes(ext);
    });

    // Sort by modified time (newest first)
    const filesWithStats = await Promise.all(
      imageFiles.map(async (file) => {
        const stat = await fs.stat(path.join(dirPath, file));
        return {
          name: file,
          url: `/blog/${file}`,
          mtime: stat.mtimeMs
        };
      })
    );

    filesWithStats.sort((a, b) => b.mtime - a.mtime);

    return NextResponse.json({ images: filesWithStats });
  } catch (error) {
    console.error('Error reading images directory:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
