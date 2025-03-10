// app/api/products/route.js
import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';
export async function GET(req) {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 8;
    const search = url.searchParams.get('search') || '';
    const category = url.searchParams.get('category') || '';

    // Construct query with search and category filtering
    let query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    // Fetch products with filters and pagination
    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({ products, pages: totalPages });
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function POST(req) {
  await connectToDatabase();
  const { title, category, price, link, image } = await req.json();
  const newProduct = new Product({ title, category, price, link, image });
  await newProduct.save();
  return Response.json(
    { message: 'Product created', product: newProduct },
    { status: 201 }
  );
}
