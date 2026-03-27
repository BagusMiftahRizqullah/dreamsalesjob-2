import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { list } from '@vercel/blob';

export async function GET() {
  try {
    // If Vercel Blob is configured (usually in Production)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
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
