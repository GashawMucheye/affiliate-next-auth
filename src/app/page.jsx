'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch categories (Assuming you have an API for categories)
  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch products with search and category filters
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/products?page=${page}&limit=8&search=${searchQuery}&category=${category}`
      );
      const data = await res.json();

      setProducts(data.products);
      setLoading(false);
      setTotalPages(data.pages || 1);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [page, searchQuery, category]);

  if (loading) {
    return <div className='text-center'>Loading...</div>;
  } // Show loading spinner

  return (
    <div className='bg-gray-100 p-6'>
      <h1 className='text-4xl font-bold text-center mb-6'>Featured Products</h1>

      {/* Search & Category Filter */}
      <div className='mb-4 flex justify-center gap-4'>
        {/* Search Input */}
        <input
          type='text'
          placeholder='Search products...'
          className='p-2 border rounded w-full max-w-md'
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1);
          }}
        />

        {/* Category Dropdown */}
        <select
          className='p-2 border rounded'
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value=''>All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Product List */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className='bg-white p-4 rounded-lg shadow-md'
            >
              <Link
                href={`/product/${product._id}`} // Link to product details page
                className='block bg-white p-4 rounded-lg shadow-md cursor-pointer'
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className='w-full h-40 object-cover rounded-md'
                />
              </Link>
              <h2 className='text-lg font-semibold mt-2'>{product.title}</h2>
              <p className='text-gray-600'>Category: {product.category}</p>
              <p className='text-green-600 font-bold'>${product.price}</p>
              <Link
                href={product.link}
                target='_blank'
                className='block mt-2 text-blue-500 hover:underline'
              >
                Buy Now
              </Link>
            </div>
          ))
        ) : (
          <p className='text-center col-span-full text-gray-500'>
            No products found.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className='flex justify-center mt-6 space-x-4'>
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className={`px-4 py-2 rounded ${
            page === 1
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 text-white'
          }`}
        >
          Previous
        </button>

        <span className='px-4 py-2'>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          className={`px-4 py-2 rounded ${
            page >= totalPages
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 text-white'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
