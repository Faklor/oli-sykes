import axios from "axios"


//===========================Post==============================
//--------------------------signIn-----------------------------
const signIn =async (email, password) => await axios.post('http://localhost:5000/api/login',{email:email, password:password})
    
//--------------------------signUp-----------------------------
const signUp =async (email, password) => await axios.post('http://localhost:5000/api/registration',{email:email, password:password})
//==================export=====================================
export {
    signIn,
    signUp,
}