'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // For getting the ID from the URL
import Link from 'next/link';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`
        );
        if (!res.ok) throw new Error('Product not found');

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <p className='text-center'>Loading...</p>;
  if (!product) return <p className='text-center'>Product not found.</p>;

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-md'>
        <img
          src={product.image}
          alt={product.title}
          className='w-full h-60 object-cover rounded-md'
        />
        <h1 className='text-2xl font-bold mt-4'>{product.title}</h1>
        <p className='text-gray-600 mt-2'>{product.description}</p>
        <p className='text-green-600 font-bold text-lg mt-4'>
          ${product.price}
        </p>

        <Link
          href={product.link}
          target='_blank'
          className='mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md'
        >
          Buy Now
        </Link>

        <Link href='/' className='block mt-4 text-blue-500 hover:underline'>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
