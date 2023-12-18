import axios from "axios"


//===========================Post==============================
//--------------------------Song-------------------------------
const songAll =async () => await axios.get('http://localhost:5000/api/song/get')
//--------------------------signUp-----------------------------
const users =async () => await axios.get('http://localhost:5000/api/users')
//--------------------------albums-----------------------------
const albums =async () => await axios.get('http://localhost:5000/api/album/get')
//---------------------------like------------------------------
const getLikeVisible =async (userId,songId) =>await axios.get('http://localhost:5000/api/song/getlike',{userId:userId,songId:songId})

//==================export=====================================
export {
    songAll,
    users,
    albums,
    getLikeVisible
} 