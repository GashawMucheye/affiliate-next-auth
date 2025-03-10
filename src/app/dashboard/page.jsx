'use client';

import { useEffect, useState } from 'react';
export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: '',
    price: '',
    link: '',
    image: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSendEmails = async () => {
    setIsSending(true);
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, message: emailMessage }),
    });
    setIsSending(false);
    if (res.ok) {
      alert('Emails sent successfully!');
      setEmailSubject('');
      setEmailMessage('');
    } else {
      alert('Failed to send emails.');
    }
  };

  const handleCreate = async () => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });
    if (res.ok) {
      await fetchProducts();
      setNewProduct({
        title: '',
        category: '',
        price: '',
        link: '',
        image: '',
      });
    }
  };

  const handleUpdate = async () => {
    if (!editingProduct) return;
    const res = await fetch(`/api/products/${editingProduct._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingProduct),
    });
    if (res.ok) {
      await fetchProducts();
      setEditingProduct(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });

      if (res.ok) {
        setProducts(products.filter((product) => product._id !== id));
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold text-center'>Admin Dashboard</h1>
      </div>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-xl font-semibold mb-4'>
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </h2>
        <input
          type='text'
          placeholder='Title'
          value={editingProduct ? editingProduct.title : newProduct.title}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, title: e.target.value })
              : setNewProduct({ ...newProduct, title: e.target.value })
          }
          className='p-2 border rounded w-full mb-2'
        />
        <input
          type='text'
          placeholder='Category'
          value={editingProduct ? editingProduct.category : newProduct.category}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({
                  ...editingProduct,
                  category: e.target.value,
                })
              : setNewProduct({ ...newProduct, category: e.target.value })
          }
          className='p-2 border rounded w-full mb-2'
        />
        <input
          type='number'
          placeholder='Price'
          value={editingProduct ? editingProduct.price : newProduct.price}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, price: e.target.value })
              : setNewProduct({ ...newProduct, price: e.target.value })
          }
          className='p-2 border rounded w-full mb-2'
        />
        <input
          type='text'
          placeholder='Link'
          value={editingProduct ? editingProduct.link : newProduct.link}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, link: e.target.value })
              : setNewProduct({ ...newProduct, link: e.target.value })
          }
          className='p-2 border rounded w-full mb-2'
        />
        <input
          type='text'
          placeholder='Image URL'
          value={editingProduct ? editingProduct.image : newProduct.image}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, image: e.target.value })
              : setNewProduct({ ...newProduct, image: e.target.value })
          }
          className='p-2 border rounded w-full mb-2'
        />
        {editingProduct ? (
          <button
            onClick={handleUpdate}
            className='bg-green-500 text-white px-4 py-2 rounded w-full'
          >
            Update Product
          </button>
        ) : (
          <button
            onClick={handleCreate}
            className='bg-blue-500 text-white px-4 py-2 rounded w-full'
          >
            Add Product
          </button>
        )}
      </div>
      //!send promotional emails
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-xl font-semibold mb-4'>Send Promotional Emails</h2>

        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name=" placeholder='Email Address' className='p-2 border rounded w-full mb-2"
          id='email'
          className='p-2 border rounded w-full mb-2'
        />
        <textarea
          placeholder='Email Message'
          value={emailMessage}
          onChange={(e) => setEmailMessage(e.target.value)}
          className='p-2 border rounded w-full mb-2'
        />
        <button
          onClick={handleSendEmails}
          disabled={isSending}
          className='bg-blue-500 text-white px-4 py-2 rounded w-full'
        >
          {isSending ? 'Sending...' : 'Send Emails'}
        </button>
      </div>
      //!manage products
      <h2 className='text-2xl font-semibold mt-6'>Manage Products</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4'>
        {products.map((product) => (
          <div key={product._id} className='bg-white p-4 rounded-lg shadow-md'>
            <img
              src={product.image}
              alt={product.title}
              className='w-full h-40 object-cover rounded-md'
            />
            <h2 className='text-lg font-semibold mt-2'>{product.title}</h2>
            <p className='text-gray-600'>Category: {product.category}</p>
            <p className='text-green-600 font-bold'>${product.price}</p>
            <div className='flex space-x-2 mt-2'>
              <button
                onClick={() => setEditingProduct(product)}
                className='bg-yellow-500 text-white px-3 py-1 rounded'
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className='bg-red-500 text-white px-3 py-1 rounded'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
