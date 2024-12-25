import React, { useContext } from 'react';
import { productContext } from './ProductContext';
import { useNavigate } from 'react-router-dom';

function OrdersList() {
  const { orders } = useContext(productContext);
const navigate = useNavigate()
  return (
    <>
      <div className="min-h-screen p-4 bg-gray-100">
        {/* Aligning the "Show Product" button to the left */}
        <div className="flex justify-between mb-4 ">
        <h2 className="mb-4 text-xl font-bold">Order List</h2>
          <button className="px-4 py-2 text-white transition bg-red-500 rounded hover:bg-red-700" onClick={()=>navigate('/')}>
            Show Product
          </button>
        </div>

        

        {orders.length === 0 ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="w-full p-4 mb-4 bg-white border rounded-lg shadow-md md:w-1/2">
              <h3 className="text-lg font-semibold">Order Details</h3>
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Phone:</strong> {order.phone}</p>

              <h4 className="mt-2 font-semibold">Items:</h4>
              <ul className="list-disc list-inside">
                {order.cartItems && order.cartItems.length > 0 ? (
                  order.cartItems.map((item) => (
                    <li key={item.id} className="flex items-center mb-2">
                      <img src={item.image} alt={item.name} className="w-16 h-16 mr-2 rounded" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Size: {item.size}</p>
                        <p className="text-sm text-gray-600">Brand: {item.brand}</p>
                        <p className="text-sm">Price: ₹{item.price.toFixed(2)} ({item.offer})</p>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>No items in this order.</p>
                )}
              </ul>

              <p className="mt-2 font-bold">Total: ₹{order.total.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Order Date: {order.date}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default OrdersList;

