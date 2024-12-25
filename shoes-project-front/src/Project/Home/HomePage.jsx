
import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { productContext } from './ProductContext';
import LastPage from './LastPage';
import Modal from "react-modal";
import HeroSection from './HeroSection';



function HomePage() {
 
  const { product, addCart, search } = useContext(productContext);
  const filteredProduct = product.filter(item => item.brand.toLowerCase().includes(search) || item.name.toLowerCase().includes(search))
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleImageClick = (product) => {
    setSelectedProduct(product); 
  };

  const closeModal = () => {
    setSelectedProduct(null); 
  };
  
  return (
    <div className='bg-gray-100 '>
      <Navbar />
    <HeroSection/>
    <div className="flex flex-wrap justify-center w-full gap-6 p-4">
  {filteredProduct.map((item) => (
    <div
      key={item.id}
      className="transition-transform duration-300 transform bg-white border rounded-lg shadow-md hover:scale-105 hover:shadow-lg"
      style={{ width: "250px" }} 
    >
      {/* Product Image */}
      <img
        src={item.image}
        alt="shoes"
        className="object-cover w-full h-48 rounded-t-lg cursor-pointer"
        onClick={() => handleImageClick(item)}
      />

      {/* Product Details */}
      <div className="flex flex-col gap-3 p-4">
        {/* Stock and Size Badge */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="px-2 py-1 bg-gray-200 rounded-md">Stock: {item.stock}</span>
          <span className="px-2 py-1 bg-gray-200 rounded-md">Size: {item.size}</span>
        </div>
        
        {/* Category */}
        <div className="text-sm text-gray-600">
          <span className="px-2 py-1 bg-gray-200 rounded-md">Category: {item.category}</span>
        </div>

        {/* Product Title */}
        <h2 className="text-lg font-semibold text-gray-800" title="Best Shoes">
          {item.brand}
        </h2>

        {/* Product Price */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">Rp {item.price}.00</span>
          <span className="text-sm text-red-500">Offer: {item.offer}</span>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-3">
          <button
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={() => addCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  ))}
</div>


{/* image click */}

<Modal
  isOpen={!!selectedProduct}
  onRequestClose={closeModal}
  className="relative p-6 mx-auto bg-white border rounded-lg shadow-lg top-6"
  style={{
    content: {
      maxWidth: "600px",  
      width: "90%",      
      maxHeight: "90vh",
      overflowY: "auto",  
      margin: "auto",     
    },
  }}
  overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
>
  {selectedProduct && (
    <div className="flex w-full p-4 bg-white rounded-lg shadow-lg">
      {/* Image on the left */}
      <div className="w-1/3">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.brand}
          className="object-cover w-full h-40 rounded-md"
        />
      </div>

      {/* Product details on the right */}
      <div className="w-2/3 pl-4">
        <h2 className="mt-2 text-xl font-bold">{selectedProduct.brand}</h2>
        <p>Category: {selectedProduct.category}</p>
        <p>Stock: {selectedProduct.stock}</p>
        <p>Size: {selectedProduct.size}</p>
        <p className="text-lg font-semibold">Price: Rp {selectedProduct.price}.00</p>
        <p className="text-sm text-gray-500">Offer: {selectedProduct.offer}</p>

        {/* Add to Cart Button */}
        <div className="flex gap-2 mt-4">
          <button
            className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-600"
            onClick={() => {
              addCart(selectedProduct);
            }}
          >
            Add to Cart
          </button>

          <button
            className="px-4 py-2 font-bold text-gray-700 bg-gray-300 rounded hover:bg-gray-400"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}
</Modal>



    
      <LastPage/>
    </div>
  );
}

export default HomePage;




