import Product from '@/models/Product';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

//get single product
export async function GET(req, { params }) {
  await connectToDatabase();
  const { id } = await params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching product' },
      { status: 500 }
    );
  }
}
//update
export async function PUT(req, { params }) {
  await connectToDatabase();
  const { id } = await params;
  const data = await req.json();

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedProduct) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating product' },
      { status: 500 }
    );
  }
}

//delete

export async function DELETE(req, { params }) {
  await connectToDatabase();
  const { id } = await params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting product' },
      { status: 500 }
    );
  }
}
