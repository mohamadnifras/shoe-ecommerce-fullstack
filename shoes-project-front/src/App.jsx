
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import './App.css'
import 'boxicons/css/boxicons.min.css'
import 'react-toastify/dist/ReactToastify.css';
// import RegisterContext from './Project/RegisterAnsLogin/RegisterContext'
import Registration from './Project/RegisterAnsLogin/Registration'
import Login from './Project/RegisterAnsLogin/Login'
// import ProductContext from './Project/Home/ProductContext'
import CartProduct from './Project/Home/CartProduct';
import OrdersList from './Project/Home/OrdersList';
import AdminPage from './Project/AdminComponent/AdminPage';
import AdminContext from './Project/AdminComponent/AdminContext';
import AdminProduct from './Project/AdminComponent/AdminProduct';
import AdminUsers from './Project/AdminComponent/AdminUsers';
import AdminDashboard from './Project/AdminComponent/AdminDashboard';
import NoMatch from './Project/NoMatch';
import ProtectedRoutes from './Project/AdminComponent/protectedRoutes';
import MenProduct from './Project/Home/MenProduct';
import WomenProduct from './Project/Home/WomenProduct';
import KidsProduct from './Project/Home/KidsProduct';
import UiHomePage from './Project/Home/UiHomePage';

function App() {


  return (
    <>
      <AdminContext>
      {/* <RegisterContext> */}
        {/* <ProductContext> */}
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<UiHomePage/>}></Route>
          <Route path='/register' element={<Registration/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/cartproduct' element={<CartProduct/>}></Route>
          <Route path='/orderlist' element={<OrdersList/>}></Route>
          <Route path='/men' element={<MenProduct/>}></Route>
          <Route path='/women'element={<WomenProduct/>}></Route>
          <Route path='/kids' element={<KidsProduct/>}></Route>
          {/* admin */}
          <Route element={<ProtectedRoutes/>}>
          <Route path='/admin' element={ <AdminPage/>}>
           <Route path='adminproduct' element={<AdminProduct/>}></Route>
           <Route path='adminuser' element={<AdminUsers/>}></Route>
           <Route path='dashboard' element={<AdminDashboard/>}></Route>
          </Route>
          </Route>
          
          <Route path='*' element={<NoMatch/>}></Route>
        </Routes>
        </BrowserRouter>
        {/* </ProductContext> */}
      {/* </RegisterContext> */}
      </AdminContext>
      
    </>
  )
}

export default App
