import React, { useContext } from "react";
import { adminContext } from "./AdminContext";
import PieChart from "./PieChart";
function AdminDashboard() {
  const { adminProduct, adminUser } = useContext(adminContext);
  const menProduct = adminProduct.filter(
    (item) => item.category === "men"
  ).length;
  const womenProduct = adminProduct.filter(
    (item) => item.category === "women"
  ).length;
  const kidsProduct = adminProduct.filter(
    (item) => item.category === "kids"
  ).length;
  const totalProductPrice = adminProduct.reduce((total, product) => {
    const price =
      typeof product.price === "number" 
        ? product.price
        : parseFloat(product.price) || 0;
    return total + price;
  }, 0);
  const unBlock = adminUser.filter((user) => user.status === true).length;
  const block = adminUser.filter((user) => user.status === false).length;
  const totalSale = adminUser.reduce((total, user) => {
    return (
      total +
      user.orders.reduce((orderTotal, order) => {
        return orderTotal + order.total;
      }, 0)
    );
  }, 0);
//Product chart
  const productData = {
    labels: ["Men", "Women", "Kids", "Total Product"],
    datasets: [
      {
        label: "Product Categories",
        data: [
          menProduct,
          womenProduct,
          kidsProduct,
          adminProduct.length,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)', 
        'rgba(54, 162, 235, 0.5)',  
        'rgba(255, 206, 86, 0.5)', 
        'rgba(255, 159, 64, 0.5)',
        
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',  
        'rgba(54, 162, 235, 1)',  
        'rgba(255, 206, 86, 1)',
       'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
//user chart
  const data = {
    labels: ["Total User", "Block", "UnBlock", ],
    datasets: [
      {
        label: "Users",
        data: [
            adminUser.length,
            block,
            unBlock,
          
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)', 
       'rgba(255, 0, 0, 0.5)',
        'rgba(255, 159, 64, 0.5)', 
        
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)', 
        'rgba(255, 0, 0, 1)', 
        'rgba(255, 159, 64, 1)',
        
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div className="grid gap-6 p-6 bg-gray-100 md:grid-cols-2 lg:grid-cols-4">
      <div className="p-4 text-center bg-white rounded shadow">
        <h1 className="text-lg font-semibold text-gray-700">
          Total Product Item:
        </h1>
        <p className="text-2xl font-bold text-blue-500">
          {adminProduct.length}
        </p>
      </div>

      <div className="p-4 text-center bg-white rounded shadow">
        <h1 className="text-lg font-semibold text-gray-700">Men Product:</h1>
        <p className="text-2xl font-bold text-blue-500">{menProduct}</p>
      </div>

      <div className="p-4 text-center bg-white rounded shadow">
        <h1 className="text-lg font-semibold text-gray-700">Women Product:</h1>
        <p className="text-2xl font-bold text-blue-500">{womenProduct}</p>
      </div>

      <div className="p-4 text-center bg-white rounded shadow">
        <h1 className="text-lg font-semibold text-gray-700">Kids Product:</h1>
        <p className="text-2xl font-bold text-blue-500">{kidsProduct}</p>
      </div>

      <div className="p-4 text-center bg-white rounded shadow">
        <h1 className="text-lg font-semibold text-gray-700">
          Total Product Price:
        </h1>
        <p className="text-2xl font-bold text-green-500">
          ₹{totalProductPrice}
        </p>
      </div>

      <div className="p-4 text-center bg-white rounded shadow">
        <h1 className="text-lg font-semibold text-gray-700">Total Users:</h1>
        <p className="text-2xl font-bold text-blue-500">{adminUser.length}</p>
      </div>

      <div className="p-4 text-center bg-white rounded shadow">
        <h1 className="text-lg font-semibold text-gray-700">Users Blocked:</h1>
        <p className="text-2xl font-bold text-red-500">{block}</p>
      </div>

      <div className="p-4 text-center bg-white rounded shadow">
        <h1 className="text-lg font-semibold text-gray-700">
          Users Unblocked:
        </h1>
        <p className="text-2xl font-bold text-blue-500">{unBlock}</p>
      </div>

      <div className="p-4 text-center bg-white rounded shadow">
        <h1 className="text-lg font-semibold text-gray-700">
          Total Sales price:
        </h1>
        <p className="text-2xl font-bold text-green-500">₹{totalSale}</p>
      </div>

    </div>
{/* chart */}
    <div className="grid gap-6 p-6 bg-gray-100 md:grid-cols-2 lg:grid-cols-2">
      <div className="w-full max-w-lg h-96">
        <p className="text-2xl font-bold underline">Product Chart</p>
        <PieChart data={productData} />
      </div>
      <div className="w-full max-w-lg h-96">
     <p className="text-2xl font-bold underline">Users</p>
        <PieChart data={data} />
      </div>
      </div>
</>
  );
}

export default AdminDashboard;
