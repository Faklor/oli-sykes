import axios from "axios"


//===========================Post==============================
//--------------------------Song-------------------------------
const songAll =async () => await axios.get('http://localhost:5000/api/song/get')
//--------------------------signUp-----------------------------
const users =async () => await axios.get('http://localhost:5000/api/users')

//==================export=====================================
export {
    songAll,
    users
} 