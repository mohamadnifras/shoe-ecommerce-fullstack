// import React, { useContext } from 'react'
// import { productContext } from './ProductContext'
// import Navbar from './Navbar';

// function WomenProduct() {
//     const {product} = useContext(productContext)
//     const womenProduct = product.filter((item) => item.category === "women");
//     return (
//       <>
//       <Navbar/>
//       <div className="flex flex-wrap justify-center gap-4 p-4 w-100%"> 
//     {womenProduct.map((item) => (
//       <div key={item.id} className="inline-block transition-transform duration-300 transform card hover:scale-105 hover:shadow-lg "> 
//         <img src={item.image} alt="shoes" className="object-cover w-full h-48"  onClick={() => handleImageClick(item)}/>
        
//         <div className="flex flex-col gap-3 p-5"> 
//           {/* badge */}
//           <div className="flex items-center gap-2">
//             <span className="badge">Stock: {item.stock}</span>
//             <span className="badge">Size: {item.size}</span>

//           </div>
//           <div>
//           <span className="badge">Category: {item.category}</span>
//           </div>
          
//           {/* product title */}
//           <h2 className="product-title" title="Best Shoes">{item.brand}</h2>

//           {/* product price */}
//           <div>
//             <span className="text-xl font-bold">Rp {item.price}.00 </span>
//             <span className="discount-percent">Offer: {item.offer}</span>
//           </div>

//           {/* product action button */}
//           <div className="flex gap-2 mt-5">
//             <button className="button-primary" onClick={()=>addCart(item)}>Add to cart</button>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
//   </>
//   )
// }

// export default WomenProduct




import { useContext } from "react";
import { productContext } from "./ProductContext";
import Navbar from "./Navbar";

function WomenProduct() {
  const { product } = useContext(productContext);
  const womenProduct = product.filter((item) => item.category === "women");

  const handleImageClick = (item) => {
    console.log("Image clicked:", item); // Placeholder function
  };

  const addCart = (item) => {
    console.log("Add to cart:", item); // Placeholder function
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-wrap justify-center gap-6 p-4">
        {womenProduct.map((item) => (
          <div
            key={item.id}
            className="w-64 overflow-hidden transition-transform duration-300 transform bg-white rounded-lg shadow-md card hover:scale-105 hover:shadow-lg"
          >
            {/* Product Image */}
            <img
              src={item.image}
              alt={item.brand}
              className="object-cover w-full h-48"
              onClick={() => handleImageClick(item)}
            />

            {/* Product Details */}
            <div className="p-4">
              {/* Badge Section */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="px-2 py-1 text-pink-800 bg-pink-100 rounded">
                  Stock: {item.stock}
                </span>
                <span className="px-2 py-1 text-purple-800 bg-purple-100 rounded">
                  Size: {item.size}
                </span>
              </div>

              {/* Product Title */}
              <h2 className="mt-3 text-lg font-semibold text-gray-800" title={item.brand}>
                {item.brand}
              </h2>

              {/* Product Price */}
              <div className="mt-2">
                <span className="text-xl font-bold text-gray-800">
                  Rp {item.price}.00
                </span>
                <span className="ml-2 text-sm text-red-500">
                  Offer: {item.offer}
                </span>
              </div>

              {/* Product Action Button */}
              <button
                className="w-full px-4 py-2 mt-4 text-white transition bg-pink-600 rounded hover:bg-pink-700"
                onClick={() => addCart(item)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default WomenProduct;
