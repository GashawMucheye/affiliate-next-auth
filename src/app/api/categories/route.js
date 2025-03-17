import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    await connectToDatabase();

    // Fetch unique categories
    const categories = await Product.distinct('category');

    return NextResponse.json(
      { categories }, // Ensure response has a consistent structure
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching categories:', error);

    return NextResponse.json(
      { message: 'Failed to fetch categories', error: error.message },
      { status: 500 }
    );
  }
}
