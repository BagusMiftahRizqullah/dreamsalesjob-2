import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { put } from '@vercel/blob';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const slug = formData.get('slug') as string || 'untitled';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file format. Only JPG, PNG, GIF, and WEBP are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (2MB)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size exceeds 2MB limit.' }, { status: 400 });
    }

    // Create unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const filename = `${slug}-${timestamp}.${extension}`;

    // If Vercel Blob is configured (usually in Production)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(`blog/${filename}`, file, {
          access: 'public',
        });
        return NextResponse.json({
          url: blob.url,
          filename: filename,
          success: true
        });
      } catch (blobError) {
        console.error('Error uploading to Vercel Blob:', blobError);
        return NextResponse.json({ error: 'Failed to upload to cloud storage' }, { status: 500 });
      }
    }

    // Fallback for local development
    const uploadDir = path.join(process.cwd(), 'public/blog');
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // Save file locally
    const filePath = path.join(uploadDir, filename);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);

    const fileUrl = `/blog/${filename}`;

    return NextResponse.json({
      url: fileUrl,
      filename: filename,
      success: true
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
