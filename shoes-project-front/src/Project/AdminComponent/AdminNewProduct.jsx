import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { adminContext } from "./AdminContext";

function AdminNewProduct({isOpen, onRequestClose}) {
    const {addAdminProduct} = useContext(adminContext);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    image: "",
    brand: "",
    price: "",
    offer: "",
    size: "",
    stock: "",
  });
  const handleSave = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleSubmit = async ()=>{
    const isFormComplete = Object.values(newProduct).every((value) => value.trim() !== "");
    if (!isFormComplete) {
      alert("Please fill out all fields before submitting.");
      return;
    }
  try{
    await addAdminProduct(newProduct)
    alert("Product added successfully!");
    onRequestClose();  
  }catch(error){
    console.error("Error saving product:", error.message);
  
  }
  }
   
  return (
    <div>
      <Modal
        isOpen={isOpen} 
        onRequestClose={onRequestClose} 
        className="max-w-lg mx-auto my-10 p-6 bg-white rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        style={{
            content: {
              width: "600px",
              height: "auto",
               maxHeight: "80vh",
              overflowY: "auto",
            },
          }}
      >

        <h2 className="text-xl font-bold mb-4">New Add Product</h2>

        <label className="block mb-1">Name:</label>
        <input
          type="text"
          value={newProduct.name}
          name="name"
          onChange={handleSave}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Enter product name"
        />

        <label className="block mb-1">Category:</label>
        <input
          type="text"
          value={newProduct.category}
          name="category"
          onChange={handleSave}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Enter Category"
        />

        <label className="block mb-1">Image URL:</label>
        <input
          type="text"
          value={newProduct.image}
          name="image"
          onChange={handleSave}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Enter Image URL"
        />

        <label className="block mb-1">Brand:</label>
        <input
          type="text"
          value={newProduct.brand}
          name="brand"
          onChange={handleSave}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Enter Brand"
        />

        <label className="block mb-1">Price:</label>
        <input
          type="number"
          value={newProduct.price}
          name="price"
          onChange={handleSave}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Enter price"
        />

        <label className="block mb-1">Offer:</label>
        <input
          type="text"
          value={newProduct.offer}
          name="offer"
          onChange={handleSave}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Enter offer"
        />

        <label className="block mb-1">Size:</label>
        <input
          type="number"
          value={newProduct.size}
          name="size"
          onChange={handleSave}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Enter size"
        />

        <label className="block mb-1">Stock:</label>
        <input
          type="number"
          value={newProduct.stock}
          name="stock"
          onChange={handleSave}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Enter stock"
        />

        <div className="mt-4">
          <button
            onClick={handleSubmit} 
            className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
          >
            Add Submit
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default AdminNewProduct;
