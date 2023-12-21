import axios from "axios"


//===========================Post==============================
//user
//--------------------------signIn-----------------------------
const signIn =async (email, password) => await axios.post('http://localhost:5000/api/login',{email:email, password:password})
//--------------------------signUp-----------------------------
const signUp =async (email,login, password) => await axios.post('http://localhost:5000/api/registration',{email:email,name:login, password:password})
//--------------------------editImg----------------------------
const editImg =async (formData) => await axios.post('http://localhost:5000/api/image', formData)
//--------------------------deleteUser-------------------------
const deleteUser =async () => await axios.post()

//song
//--------------------------addSong----------------------------
const addSong =async (title, url, albumId) => await axios.post('http://localhost:5000/api/song/create',{title:title,url:url,albumId:albumId})
//--------------------------deleteSong-------------------------
const deleteSong =async (id) => await axios.post('http://localhost:5000/api/song/delete',{id:id})
//--------------------------edit--Song-------------------------
const editSong =async (id, title, url, albumId) => await axios.post('http://localhost:5000/api/song/update',{id:id,title:title,url:url,albumId:albumId})
//--------------------------addLike----------------------------
const addLike =async (userId,songId)=> await axios.post('http://localhost:5000/api/song/like',{userId:userId, songId:songId})
//--------------------------deleteLike----------------------------
const deleteLike =async (userId,songId)=> await axios.post('http://localhost:5000/api/song/unlike',{userId:userId, songId:songId})
//---------------------------like------------------------------
const getLikeVisible =async (userId,songId) => await axios.post('http://localhost:5000/api/song/getlike',{userId:userId,songId:songId})
//---------------------------commnet---------------------------
const addComment=async (comment,userId, songId)  => await axios.post('http://localhost:5000/api/song/comment',{comment:comment,userId:userId,songId:songId})

//album
//------------------------addAlbum-----------------------------
const addAlbum =async (title, url) => await axios.post('http://localhost:5000/api/album/create',{title:title,img:url})
//------------------------updateAlbum--------------------------
const updateAlbum =async (id,title, url) => await axios.post('http://localhost:5000/api/album/update',{id:id,title:title,img:url})
//------------------------deleteAlbum--------------------------
const deleteAlbum =async (id) => await axios.post('http://localhost:5000/api/album/delete',{id:id})

//post
//------------------------addPost------------------------------
const addPost =async (title, text, url) => await axios.post('http://localhost:5000/api/post/create',{title:title,description:text,img:url})
//------------------------updatePost---------------------------
const updatePost =async (id,title, text, url) => await axios.post('http://localhost:5000/api/post/update',{id:id,title:title,description:text,img:url})
//------------------------deletePost---------------------------
const deletePost =async (id) => await axios.post('http://localhost:5000/api/post/delete',{id:id})
//==================export=====================================
export {
    signIn,
    signUp,
    editImg,
    deleteUser,
    //song
    addSong,
    deleteSong,
    editSong,
    addLike,
    deleteLike,
    getLikeVisible,
    //album
    addAlbum,
    updateAlbum,
    deleteAlbum,
    //post
    addPost,
    updatePost,
    deletePost,
    addComment
} 