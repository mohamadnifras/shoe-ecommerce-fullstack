import { useContext, useState } from "react";
import { productContext } from "./ProductContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRectangleList,
  faSearch,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons/faCircleUser";
import { Button, Menu, MenuItem } from "@mui/material";
// import { passContext } from "../RegisterAnsLogin/RegisterContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {
  const { setSearch, cart, setCart } = useContext(productContext);
  const [anchorEl, setAnchorEl] = useState(null);
  // const { user, logout } = useContext(passContext);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleLogout = () => {
    logout();
    setCart([]);
    handleClose();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">

      <div className="flex items-center justify-between bg-[#0f172a] p-4 lg:px-8 h-14">
        {/* Logo */}
      
       <a href="/" className="relative right-7">
          <span className="text-lg font-bold text-gray-500 lg:text-xl">
            TEACH
          </span>
          <span className="text-lg font-bold text-orange-500 lg:text-xl">
            SHOE
          </span>
        </a>
    

        {/* Navigation Links */}
        <ul className="flex items-center space-x-6 lg:space-x-8">
          <li>
            <Link
              to="/men"
              className="font-serif text-sm text-white hover:text-blue-200 lg:text-base hover:scale-105"
            >
              Mens
            </Link>
          </li>
          <li>
            <Link
              to="/women"
              className="font-serif text-sm text-white hover:text-blue-200 lg:text-base hover:scale-105"
            >
              Women
            </Link>
          </li>
          <li>
            <Link
              to="/kids"
              className="font-serif text-sm text-white hover:text-blue-200 lg:text-base hover:scale-105"
            >
              Kids
            </Link>
          </li>
        </ul>

        {/* Search Bar */}
        <div className="relative flex justify-center flex-1 max-w-sm mx-4 lg:max-w-lg">
          <input
            type="text"
            placeholder="Search for Products, Brands"
            onChange={handleSearchChange}
            className="w-full h-8 px-4 pl-12 transition duration-200 ease-in-out bg-gray-200 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute text-base text-gray-600 transform -translate-y-1/2 left-4 top-1/2"
          />
        </div>

        {/* Icons and Profile */}
        <div className="flex items-center space-x-6 lg:space-x-8">
          {/* Order List */}
          <Link to="/orderlist" className="flex flex-col items-center">
            <FontAwesomeIcon
              icon={faRectangleList}
              className="text-lg text-white lg:text-xl"
            />
            <span className="text-sm text-white lg:text-base">Order List</span>
          </Link>

          {/* Cart */}
          <Link
            to="/cartproduct"
            className="relative flex flex-col items-center"
          >
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-lg text-white lg:text-xl"
            />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 px-2 py-0.5 text-xs text-white bg-red-500 rounded-full transform translate-x-2 -translate-y-2 lg:text-sm">
                {cart.length}
              </span>
            )}
            <span className="text-sm text-white lg:text-base">Cart</span>
          </Link>

          {/* Profile Menu */}
          <Button
            aria-controls={open ? "user-menu" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            className="flex flex-col items-center"
          >
            <FontAwesomeIcon
              icon={faCircleUser}
              className="text-lg text-white lg:text-xl"
            />
            <span className="text-sm text-white lg:text-base">
              {user ? user.firstname : "Login"}
            </span>
          </Button>
        </div>

        {/* Dropdown Menu */}
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          {user ? (
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          ) : (
            <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
          )}
        </Menu>
      </div>
    </nav>
  );
}

export default Navbar;
