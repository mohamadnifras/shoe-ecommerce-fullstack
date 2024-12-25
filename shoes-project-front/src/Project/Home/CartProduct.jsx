import React, { useContext, useState } from "react";
import { productContext } from "./ProductContext";
import Payment from "./Payment";
import { useNavigate } from "react-router-dom";

function CartProduct() {
  const { cart, removeCart, setCart } = useContext(productContext);
  const [paymentOpen, setPaymentOpen] = useState(false);
const navigate  = useNavigate()
  const subTotal = cart.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );
  const taxRate = 0.05;
  const tax = subTotal * taxRate;
  const total = subTotal + tax;

  const incrementQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const decrementQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  return (
    <div>
      
     
      
      {cart.length === 0 ? (
       <div className="flex items-center justify-between mb-4">
       <h1 className="mt-6 font-bold text-gray-700">
         Cart is Empty 🛒
       </h1>
       <button 
         className="px-4 py-2 text-white transition bg-red-500 rounded hover:bg-red-700"
         onClick={() => navigate('/')}
       >
         Show Product
       </button>
     </div>
     
      ) : (

        <div className="p-4 overflow-x-auto">
          <table className="min-w-full border border-collapse border-gray-300 table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Quantity</th>
                <th className="px-4 py-2 border">Subtotal</th>
                <th className="px-4 py-2 border">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="px-4 py-2 border">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-16 h-16 rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border">{item.name}</td>
                  <td className="px-4 py-2 border">
                    ₹{Number(item.price).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => decrementQuantity(item.id)}
                        className="px-2 py-1 text-white transition bg-red-500 rounded hover:bg-red-700"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => incrementQuantity(item.id)}
                        className="px-2 py-1 text-white transition bg-green-500 rounded hover:bg-green-700"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2 border">
                    ₹{(Number(item.price) * item.quantity).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => removeCart(item.id)}
                      className="px-3 py-1 text-white transition bg-red-500 rounded hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {cart.length > 0 && (
        <div className="max-w-sm p-6 mx-auto mt-6 bg-white border rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-center">Order Summary</h2>
          <div className="mb-4">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between py-2 border-b">
                <span>{item.name}</span>
                <span> ₹{Number(item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between py-2 font-bold border-b">
            <span>Subtotal</span>
            <span> ₹{subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>Tax (5%)</span>
            <span> ₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 font-bold">
            <span>Total</span>
            <span> ₹{total.toFixed(2)}</span>
          </div>
          <button
            className="w-full py-2 mt-4 font-semibold text-white transition duration-200 bg-green-500 rounded hover:bg-green-600"
            onClick={() => setPaymentOpen(true)}
          >
            Pay Now
          </button>
        </div>
      )}

      {paymentOpen && (
        <Payment
          isOpen={paymentOpen}
          onRequestClose={() => setPaymentOpen(false)}
          total={total}
          cart={cart}
          setCart={setCart}
        />
      )}
    </div>
  );
}

export default CartProduct;
