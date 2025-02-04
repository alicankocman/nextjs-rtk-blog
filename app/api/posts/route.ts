import { NextResponse } from 'next/server';

export async function GET() {
  // Veritabanından postları çek
  return NextResponse.json({ posts: [] });
}

export async function POST(request: Request) {
  // body kullanılmadığı için kaldırıldı
  return NextResponse.json({ success: true });
} 