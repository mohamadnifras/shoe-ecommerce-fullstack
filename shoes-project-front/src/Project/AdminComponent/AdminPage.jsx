import React from 'react'
import AdminNavbar from './AdminNavbar'
import { Outlet } from 'react-router-dom'
function AdminPage() {
  return (
    <div className='flex h-screen'>
      <div className="w-1/5 bg-gray-900">
      <AdminNavbar/>
      </div>
 
     <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
     <Outlet/>
     </div>

     
    </div> 
  )
}

export default AdminPage


