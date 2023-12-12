import axios from "axios"


//===========================Post==============================
//--------------------------Song-------------------------------
const songAll =async () => await axios.get('http://localhost:5000/api/song')
//--------------------------signUp-----------------------------
const signUp =async (email,login, password) => await axios.post('http://localhost:5000/api/registration',{email:email,name:login, password:password})
//--------------------------editImg----------------------------
const editImg =async (formData) => await axios.post('http://localhost:5000/api/image', formData)
//==================export=====================================
export {
    songAll,
} 