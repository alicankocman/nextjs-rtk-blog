import { NextResponse } from 'next/server';

export async function GET() {
  // Veritabanından postları çek
  return NextResponse.json({ posts: [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  // Veritabanına kaydet
  return NextResponse.json({ success: true });
} 