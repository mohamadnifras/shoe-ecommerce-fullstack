import React from "react";
import { Modal } from '@mui/material'


function AdminItemProduct({isOpen, onClose, orders}) {

   
   
  return (
    <div>
      <Modal open={isOpen} onClose={onClose} aria-labelledby="product-item-modal " >
      <div className="bg-white p-6 rounded-lg mx-auto my-20 max-w-md  max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">User's Product Orders</h2>
        <ul className="space-y-2">
        {orders && orders.length > 0 ? (
            orders.flatMap((order) =>
              order.cartItems.map((item, itemIndex) => (
                  <li key={itemIndex} className="border-b pb-2 mb-2">
                    <img src={item.image} alt={item.name} className="w-16 h-16 mt-2" />
                  <p><strong>Product Name:</strong> {item.name}</p>
                  <p><strong>Brand:</strong> {item.brand}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Price:</strong> ₹{item.price}</p>
                  <p><strong>Size:</strong> {item.size}</p>
                  <p><strong>Category:</strong> {item.category}</p>
                </li>
              ))
            )
          ) : (
            <p>No items available for this user.</p>
          )}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </Modal>
    </div>
  )
}

export default AdminItemProduct