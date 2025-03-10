import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Product.distinct('category');
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
