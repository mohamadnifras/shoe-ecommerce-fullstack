import  { useContext } from "react";
import { productContext } from "./ProductContext";
import Navbar from "./Navbar";

function MenProduct() {
  const { product } = useContext(productContext);
  const menProduct = product.filter((item) => item.category === "men");

  const handleImageClick = (item) => {
    console.log("Image clicked", item);
  };

  const addCart = (item) => {
    console.log("Add to cart", item);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-wrap justify-center gap-6 p-4">
        {menProduct.map((item) => (
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
                <span className="px-2 py-1 text-blue-800 bg-blue-100 rounded">
                  Stock: {item.stock}
                </span>
                <span className="px-2 py-1 text-green-800 bg-green-100 rounded">
                  Size: {item.size}
                </span>
              </div>

              {/* Product Title */}
              <h2
                className="mt-3 text-lg font-semibold text-gray-800"
                title={item.brand}
              >
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
                className="w-full px-4 py-2 mt-4 text-white transition bg-blue-600 rounded hover:bg-blue-700"
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

export default MenProduct;
