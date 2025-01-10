import React  from "react";
import { Form, Field, Formik } from "formik";
import { RegisterValidation } from "./RegisterValidation";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {registerUser} from "../../features/authSlice"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Registration() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  
  const handleSubmit = async (values) => {
    try {
      await dispatch(registerUser(values)).unwrap()
      .then((response)=>{
        navigate('/login');
        toast.success('Registration successful!')
        
      })
    } catch (error) {
     toast.error(error) 
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-400">
      <ToastContainer/>
      <div className="w-3/4 overflow-hidden bg-white rounded-lg shadow-md md:flex">
        <div
          className="flex-1 p-8 text-white"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1656335362192-2bc9051b1824?q=80&w=1895&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="flex-1 p-8 bg-gray-300">
          <h2 className="mb-6 text-2xl font-bold text-center text-blue-600">
            REGISTER FORM
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={RegisterValidation}
            validateOnChange={false}
            validateOnBlur={true}
            onSubmit={handleSubmit}
          >
            {({ errors }) => (
              <Form>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <Field
                      type="text"
                      name="firstname"
                      className="w-full p-2 bg-gray-100 border rounded-md"
                      placeholder="First Name"
                    />
                    {errors.firstname && (
                      <small className="text-red-500">{errors.firstname}</small>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <Field
                      type="text"
                      name="lastname"
                      className="w-full p-2 bg-gray-100 border rounded-md"
                      placeholder="Last Name"
                    />
                    {errors.lastname && (
                      <small className="text-red-500">{errors.lastname}</small>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full p-2 bg-gray-100 border rounded-md"
                    placeholder="Your Email"
                  />
                  {errors.email && (
                    <small className="text-red-500">{errors.email}</small>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full p-2 bg-gray-100 border rounded-md"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <small className="text-red-500">{errors.password}</small>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="w-full p-2 bg-gray-100 border rounded-md"
                    placeholder="Confirm Password"
                  />
                  {errors.conpassword && (
                    <small className="text-red-500">{errors.conpassword}</small>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full p-3 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  >
                    Register
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Registration;
