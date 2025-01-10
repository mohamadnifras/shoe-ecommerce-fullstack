import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { loginUser } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const initialValues = {
  email: "",
  password: "",
};
function Login() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated, adminAuthenticated, error } = useSelector(
    (state) => state.auth
  );
  const handleSubmit = async (values) => {
 
    try {
      await dispatch(loginUser(values))
        .unwrap()
        .then((respons) => {
          toast.success(respons.data.message)
        });
    } catch (error) {
      toast.error(error)
  }
}
  
  useEffect(() => {
    
    if (user) {
      console.log(user);
      
        if (user.role === "user" && isAuthenticated) {
            navigate("/");
        } else if (user.role === "admin" && adminAuthenticated) {
            navigate("/admin");
        }
    }
}, [user, error, navigate, isAuthenticated, adminAuthenticated]);

 
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{
        backgroundImage:
          'url("https://i.pinimg.com/originals/e6/16/50/e61650efc5d6acff4c558aab0830d07a.jpg")',
      }}
    >
         <ToastContainer 
         autoClose={400}/>
      <div className="w-full max-w-md p-8 bg-black rounded-lg shadow-lg bg-opacity-70">
        <h2 className="mb-6 text-2xl font-bold text-center text-white">
          Login
        </h2>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {() => (
            <Form>
              <div className="mb-4">
                <label className="block mb-1 text-white">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-3 bg-white border border-gray-300 rounded-md"
                ></Field>
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-white">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full p-3 bg-white border border-gray-300 rounded-md"
                ></Field>
              </div>
              <button
                type="submit"
                className="w-full py-3 text-white transition duration-300 bg-purple-600 rounded-md hover:bg-purple-700"
              >
                Login
              </button>
              <p className="mt-4 text-center text-white">
                Dont't have an account?
                <Link to="/register" className="text-blue-400 underline">
                  Register
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}



export default Login;
