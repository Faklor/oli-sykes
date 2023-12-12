import axios from "axios"


//===========================Post==============================
//--------------------------signIn-----------------------------
const signIn =async (email, password) => await axios.post('http://localhost:5000/api/login',{email:email, password:password})
//--------------------------signUp-----------------------------
const signUp =async (email,login, password) => await axios.post('http://localhost:5000/api/registration',{email:email,name:login, password:password})
//--------------------------editImg----------------------------
const editImg =async (formData) => await axios.post('http://localhost:5000/api/image', formData)
//==================export=====================================
export {
    signIn,
    signUp,
    editImg
} 