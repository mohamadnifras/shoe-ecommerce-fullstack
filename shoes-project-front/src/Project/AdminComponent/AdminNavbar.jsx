import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket,faBox, faChartLine, faUser } from '@fortawesome/free-solid-svg-icons'; 
import { useNavigate } from 'react-router-dom';
function AdminNavbar() {
  const navigate = useNavigate()
  const handleLogout = () =>{
    ["id", "name", "email","password", "role"].forEach(key => localStorage.removeItem(key));
    navigate('/login')
  }
  return (
    <>
     <div className="sticky top-0 flex flex-col h-screen p-4 text-white bg-gray-900">
      <div className="flex justify-center mb-6">
        <img src="/shoeimages/adminlogo.png" alt="Admin Logo" className="rounded-full w-30 h-30" />
      </div>
      
      <nav className="flex flex-col gap-4">
        <button 
          className="flex items-center gap-2 px-4 py-2 transition duration-300 bg-gray-300 rounded bg-opacity-20 hover:bg-opacity-40" 
          onClick={() => navigate('dashboard')} 
        >
          <FontAwesomeIcon icon={faChartLine} />
          Dashboard
        </button>
        <button 
          className="flex items-center gap-2 px-4 py-2 transition duration-300 bg-gray-300 rounded bg-opacity-20 hover:bg-opacity-40" 
          onClick={() => navigate('/admin/adminproduct')} 
        >
          <FontAwesomeIcon icon={faBox} />
          Products
        </button>
        <button 
          className="flex items-center gap-2 px-4 py-2 transition duration-300 bg-gray-300 rounded bg-opacity-20 hover:bg-opacity-40" 
          onClick={() => navigate('/admin/adminuser')} 
        >
          <FontAwesomeIcon icon={faUser} />
          Users
        </button>
        <button 
          className="flex items-center gap-2 px-4 py-2 mt-auto transition duration-300 bg-gray-300 rounded bg-opacity-20 hover:bg-opacity-40" 
          onClick={handleLogout} 
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          Logout
        </button>
      </nav>
    </div>
    </>
  )
}

export default AdminNavbar