import axios from "axios"


//===========================Post==============================
//--------------------------Song-------------------------------
const songAll =async () => await axios.get('http://localhost:5000/api/song/get')
//--------------------------signUp-----------------------------
const users =async () => await axios.get('http://localhost:5000/api/users')
//--------------------------albums-----------------------------
const albums =async () => await axios.get('http://localhost:5000/api/album/get')

//==================export=====================================
export {
    songAll,
    users,
    albums
} 