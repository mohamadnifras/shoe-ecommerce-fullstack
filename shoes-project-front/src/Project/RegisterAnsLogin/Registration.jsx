import React, { useContext } from "react";
import { Form, Field, Formik } from "formik";
import { RegisterValidation } from "./RegisterValidation";
import { passContext } from "./RegisterContext";
import { useNavigate } from "react-router-dom";

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  conpassword: "",
};

function Registration() {
  const { userRegister, addRegiter } = useContext(passContext);
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      const saveValues = {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
        status:true,
        cart: [],
        orders: [],
      };
      const existUserRegister = await userRegister(values.email);

      if (existUserRegister) {
        alert("user already registered");
      } else {
        const newRegister = addRegiter(saveValues);
        console.log("User registered successfully:", newRegister.data);
        navigate("/login");
      }
    } catch (errors) {
      console.error("Error registering user:", errors);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="bg-white shadow-md rounded-lg overflow-hidden md:flex w-3/4">
        <div
          className="flex-1 text-white p-8"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1656335362192-2bc9051b1824?q=80&w=1895&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="flex-1 p-8 bg-gray-300">
          <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
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
                      className="w-full p-2 border rounded-md bg-gray-100"
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
                      className="w-full p-2 border rounded-md bg-gray-100"
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
                    className="w-full p-2 border rounded-md bg-gray-100"
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
                    className="w-full p-2 border rounded-md bg-gray-100"
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
                    name="conpassword"
                    className="w-full p-2 border rounded-md bg-gray-100"
                    placeholder="Confirm Password"
                  />
                  {errors.conpassword && (
                    <small className="text-red-500">{errors.conpassword}</small>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
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
