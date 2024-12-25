import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

function Payment({ isOpen, onRequestClose, total, cart, setCart }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    const orderDate = new Date().toLocaleString();

    const orderData = {
      name: formData.name,
      address: formData.address,
      email: formData.email,
      phone: formData.phone,
      cartItems: cart,
      total: total,
      date: orderDate,
    };

    try {
      const id = localStorage.getItem("id");
      console.log("id", id);

      const response = await axios.get(`http://localhost:5000/users/${id}`);
      const user = response.data;

      const updatedOrders = [...user.orders, orderData];

      await axios.put(`http://localhost:5000/users/${id}`, {
        ...user,
        orders: updatedOrders,
        cart: [],
      });

      toast.success("Payment successful and order saved!");
      setCart([]);
      onRequestClose();
      navigate("/orderlist");
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className="p-6 mx-auto bg-white border rounded-lg shadow-lg"
        style={{
          content: {
            width: "90%", // Responsive width (90% of the screen)
            maxWidth: "600px", // Maximum width
            height: "auto", // Height adjusts to content
            maxHeight: "80vh", // Maximum height (80% of viewport height)
            overflowY: "auto", // Allow scrolling if content exceeds maxHeight
            margin: "auto", // Center the modal horizontally
          },
        }}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="mb-4 text-xl font-bold">Payment Confirmation</h2>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Enter your name"
          />

          <label className="block mb-2 font-bold">Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Enter your address"
          />

          <label className="block mb-2 font-bold">Email:</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Enter your email"
          />

          <label className="block mb-2 font-bold">Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            placeholder="000 000 0000"
          />
        </div>

        <div className="mb-4">
          <h3 className="mb-2 font-bold">Order Summary:</h3>
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between py-1">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <p className="text-right">
          Total Amount: <strong>${total.toFixed(2)}</strong>
        </p>

        <div className="flex justify-between mt-2">
          <button
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            onClick={handlePayment}
          >
            Confirm Payment
          </button>
          <button
            className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
            onClick={onRequestClose}
          >
            Cancel
          </button>
        </div>
      </Modal>

      <ToastContainer />
    </>
  );
}

export default Payment;
