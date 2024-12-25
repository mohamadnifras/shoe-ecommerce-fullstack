import * as Yup from 'yup'

export const RegisterValidation = Yup.object({
    firstname: Yup.string().required('Please Enter firstname'),
    lastname: Yup.string().required('Please Enter lastname'),
    email: Yup.string().email('Please Enter Valid email').required('Please Enter Email'),
    password: Yup.string().min(8).required('Please Enter Password'),
    conpassword: Yup.string().oneOf([Yup.ref('password')],'Password not matched').required('Please conpassword')
})