import React, { useContext, useState } from "react";
import AdminItemProduct from "./AdminItemProduct";
import { adminContext } from "./AdminContext";
import axios from "axios";


function AdminUsers() {
  const {adminUser,setAdminUser} = useContext(adminContext)
  const [selectedUserOrders,setSelectedUserOrders]=useState(null);
  const [isModalUserOpen,setIsModalUserOpen]=useState(false);

//Item product
const handleItem = (userOrder)=>{
  setSelectedUserOrders(userOrder)
  setIsModalUserOpen(true);
}

// user Block
const toggleUserStatus = async (user)=>{
  try{
    
      const response=await axios.patch(`http://localhost:5000/users/${user.id}`,{status :!user.status,});
      if(response.status>=200){
        setAdminUser((prevData)=>prevData.map((userData)=>{if(userData.id === response.data.id){
          return response.data
        }else{
         return userData
        }
      }))

      }

    
  }catch(error){
    console.error(error.message);
    
  }

}
  return (
    <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr className="bg-gray-800 border-b border-gray-300">
          <th className="text-left p-4 font-semibold text-gray-100">User Name</th>
          <th className="text-left p-4 font-semibold text-gray-100">Email</th>
          <th className="text-left p-4 font-semibold text-gray-100">Product Item</th>
          <th className="text-left p-4 font-semibold text-gray-100">Block User</th>
        </tr>
      </thead>
      <tbody>
        {adminUser.map((user) => (
          <tr key={user.id} className="border-b border-gray-300 hover:bg-gray-50">
            <td className="p-4 text-gray-800">{user.firstname} {user.lastname}</td>
            <td className="p-4 text-gray-800">{user.email}</td>
            <td className="p-4 text-center">
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300" 
              onClick={()=>handleItem(user.orders)}>
                Product Item
              </button>
            </td>
            <td className="p-4 text-center">
              <button className={`${user.status? "bg-red-500 hover:bg-red-600 px-4 py-2 text-white rounded transition duration-300" :  "bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white rounded transition duration-300"}`}
              onClick={()=> toggleUserStatus(user)}>
                {user.status? "Block" : "Unblock"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <AdminItemProduct
    isOpen={isModalUserOpen}
    onClose={()=>setIsModalUserOpen(false)}
    orders={selectedUserOrders}/>
  </div>
  

  );
}

export default AdminUsers;
