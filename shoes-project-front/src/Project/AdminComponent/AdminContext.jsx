import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const adminContext = createContext();
function AdminContext({ children }) {
  const [adminProduct, setAdminProduct] = useState([]);
  const [adminUser, setAdminUser] = useState([]);
  // admin product
  useEffect(() => {
    const fecthAdmin = async () => {
      try {
        const respons = await axios.get("http://localhost:5000/products");
        setAdminProduct(respons.data);
      } catch (error) {
        console.log("admin Product data", error.message);
      }
    };
    fecthAdmin();
  }, []);
  //admin user
  useEffect(() => {
    const fecthAdminUser = async () => {
      try {
        const respons = await axios.get("http://localhost:5000/users");
        setAdminUser(respons.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fecthAdminUser();
  }, []);

  //admin add product
  const addAdminProduct = async (newProduct) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/products",
        newProduct
      );
      console.log("data", response);

      if(response.status>=200){
        setAdminProduct([...adminProduct,response.data])
      }


      return response.data;
    } catch (error) {
      console.error("Error saving product:", error.message);
      throw error;
    }
  };

  //edit product
  const editAdminProduct = async (updatedProduct) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/products/${updatedProduct.id}`,
        {
          name: updatedProduct.name,
          category: updatedProduct.category,
          image: updatedProduct.image,
          brand: updatedProduct.brand,
          price: updatedProduct.price,
          stock: updatedProduct.stock,
        }
      );
      if (response.status >= 200) {
        const editedProductList = adminProduct.map((products) => {
          if (products.id == updatedProduct.id) {
            return updatedProduct;
          } else {
            return products;
          }
        });
        setAdminProduct(editedProductList);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
//product delete
  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/products/${productId}`
      );
      if (response.status === 200) {
        setAdminProduct((prevProducts) =>
          prevProducts.filter((product) => product.id != productId)
        );
      console.log(`Product with id ${productId} deleted successfully.`);
      
      }
    } catch (error) {
      console.log('An error occurred while deleting the product:', error);
      
    }
  };

  return (
    <adminContext.Provider
      value={{ adminProduct, adminUser, addAdminProduct, editAdminProduct, deleteProduct,setAdminUser}}
    >
      {children}
    </adminContext.Provider>
  );
}

export default AdminContext;
