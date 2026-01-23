import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import mime from 'mime';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; filename: string }> }
) {
  const { slug, filename } = await params;
  
  // Security check: prevent directory traversal
  if (filename.includes('..') || slug.includes('..')) {
    return new NextResponse('Invalid path', { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'content/posts', slug, filename);

  if (!fs.existsSync(filePath)) {
    return new NextResponse('File not found', { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);
  const contentType = mime.getType(filePath) || 'application/octet-stream';

  const isDev = process.env.NODE_ENV === 'development';

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': contentType,
      // No cache in dev for instant updates, cache in prod
      'Cache-Control': isDev ? 'no-store, must-revalidate' : 'public, max-age=3600',
    },
  });
}