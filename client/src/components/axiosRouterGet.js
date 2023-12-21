import axios from "axios"


//===========================Post==============================
//--------------------------Song-------------------------------
const songAll =async () => await axios.get('http://localhost:5000/api/song/get')
//--------------------------signUp-----------------------------
const users =async () => await axios.get('http://localhost:5000/api/users')
//--------------------------albums-----------------------------
const albums =async () => await axios.get('http://localhost:5000/api/album/get')
//--------------------------getOneAlbum------------------------
const oneAlbum =async (id) => await axios.get('http://localhost:5000/api/album/get/'+id)
//---------------------------Blogs-----------------------------
const blogs =async () => await axios.get('http://localhost:5000/api/post/get')

//sorted
//---------------------------likes-----------------------------
const songsLikes =async () => await axios.get('http://localhost:5000/api/song/sortedSongs')
//==================export=====================================
export { 
    users,
    //song---------
    songAll,
    albums,
    oneAlbum,
    songsLikes,
    //post---------
    blogs
} 