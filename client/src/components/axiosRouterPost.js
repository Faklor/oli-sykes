import axios from "axios"


//===========================Post==============================
//--------------------------signIn-----------------------------
const signIn =async (email, password) => await axios.post('http://localhost:5000/api/login',{email:email, password:password})
//--------------------------signUp-----------------------------
const signUp =async (email,login, password) => await axios.post('http://localhost:5000/api/registration',{email:email,name:login, password:password})
//--------------------------editImg----------------------------
const editImg =async (formData) => await axios.post('http://localhost:5000/api/image', formData)
//--------------------------deleteUser-------------------------
const deleteUser =async () => await axios.post()

//--------------------------addSong----------------------------
const addSong =async (title, url, albumId) => await axios.post('http://localhost:5000/api/song/create',{title:title,url:url,albumId:albumId})
//==================export=====================================
export {
    signIn,
    signUp,
    editImg,
    addSong
} 