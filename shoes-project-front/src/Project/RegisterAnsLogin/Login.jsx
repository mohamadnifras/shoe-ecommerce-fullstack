import React, { useContext } from 'react'
import { passContext } from './RegisterContext'
import { useNavigate, Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik';




const initialValues = {
    email:'',
    password:''
}
function Login() {
    const {loginResgister} = useContext(passContext);
    const navigate = useNavigate()


    const handleSubmit = async (values) =>{
        try{
            const {email, password}=values
            const adminEmail = "adminnifras@gmail.com";
            const adminPassword = "77770000";
            
            //admin
            if (email === adminEmail && password === adminPassword) {
              
              localStorage.setItem("id", "ni7");
              localStorage.setItem("name", "Admin Nifras");
              localStorage.setItem("email", adminEmail);
              localStorage.setItem("password",  adminPassword );
              localStorage.setItem("role",  "admin" );
              navigate("/admin");
              return;
            } 
            
            const data = await loginResgister(email, password);
//user
            if(!data){
              alert("Please Registration first.")
            }else if(data.status){
              data.status = true;  
              const username = data.firstname;
              const id = data.id;
              localStorage.setItem('id', id);
              localStorage.setItem("name", username);
              localStorage.setItem('email', email);
              navigate('/');
            }else{
             alert("Your account is blocked.❗");
            }
        }catch(errors){
         console.error(errors);
            
        }
    }
  return (
    <div  className="flex items-center justify-center min-h-screen bg-center bg-cover"
    style={{ backgroundImage: 'url("https://i.pinimg.com/originals/e6/16/50/e61650efc5d6acff4c558aab0830d07a.jpg")' }}>
      <div className="w-full max-w-md p-8 bg-black rounded-lg shadow-lg bg-opacity-70">
        <h2 className="mb-6 text-2xl font-bold text-center text-white">Login</h2>
        <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
         
        >
        {()=>(
          <Form>
          <div className="mb-4">
            <label className="block mb-1 text-white">Email</label>
            <Field type='email' name='email' className="w-full p-3 bg-white border border-gray-300 rounded-md" ></Field>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-white">Password</label>
            <Field type='password' name='password' className="w-full p-3 bg-white border border-gray-300 rounded-md" ></Field>
          </div>
          <button type='submit' className="w-full py-3 text-white transition duration-300 bg-purple-600 rounded-md hover:bg-purple-700" >Login</button>
          <p  className="mt-4 text-center text-white">
            Dont't have an account? <Link to='/register'  className="text-blue-400 underline">Register</Link>
          </p>
        </Form>
        )}
        </Formik>
      </div>
    </div>
  )
}

export default Login