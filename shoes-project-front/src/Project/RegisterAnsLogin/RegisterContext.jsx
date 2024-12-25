import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const passContext = createContext();
function RegisterContext({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const storedId = localStorage.getItem("id");

    if (storedUser && storedEmail && storedId) {
      setUser({
        firstname: storedUser,
        email: storedEmail,
        id: storedId,
      });
    }
  }, []);

  //all ready Register
  const userRegister = async (email) => {
    try {
      const respons = await axios.get(
        `http://localhost:5000/users?email=${email}`
      );
      if (respons.data && respons.data.length > 0) return true;
    } catch (errors) {
      console.log("Error checking user registration", errors);
    }
  };

  //new register
  const addRegiter = async (userData) => {
    try {
      const newRegister = await axios.post(
        "http://localhost:5000/users",
        userData
      );
      return newRegister;
    } catch (errors) {
      console.log("Error confirm user registration", errors);
    }
  };

  //login page
  const loginResgister = async (email, password) => {
    try {
      const newLogin = await axios.get(
        `http://localhost:5000/users?email=${email}&password=${password}`
      );
      if (newLogin.data.length > 0) {
        const data = newLogin.data[0];
        setUser(data);
        return data;
      }
      return null;
    } catch (errors) {
      return null;
    }
  };
  const logout=()=>{
    ["id", "name", "email"].forEach(key => localStorage.removeItem(key));
    
    setUser(null);  
  }

  return (
    <passContext.Provider
      value={{ userRegister, addRegiter, loginResgister, user ,logout}}
    >
      {children}
    </passContext.Provider>
  );
}

export default RegisterContext;
