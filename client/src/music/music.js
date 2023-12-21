import Header from "../components/header"
import Slyder from './slyder'
import Song from './song'
import Video from './components/video'
import Like from './components/like'
//------------------redux-----------------------
import { useSelector } from "react-redux/es/hooks/useSelector"
import { selectUser } from "../store/nowUser"

import './music.scss'
//-----------------axios------------------------
import {addComment, getLikeVisible, addLike, deleteLike} from '../components/axiosRouterPost' 
import { 
    songAll,
    albums,
    oneAlbum,
 } from '../components/axiosRouterGet' 
import { useEffect, useState, memo } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"

//import axios from 'axios'

const Songs= props=>{
    //==============state===========================
    const [arraySongs, setArraySongs] = useState([])
    const [arrayAlbums, setArrayAlbums] = useState([])
    const [arrayComment, setArrayCommnet] = useState([])
    const [like, setLiked] = useState('')
    const [listLikes, setListLikes] = useState('')
    //--------------video---------------------------
    const [video, setVideo] = useState('http://www.youtube.com/embed/UNaYpBpRJOY?si=YqDdXzD_4ARsFoYk')
    const [idSong, setIdSong] = useState('')
    //==============navigate========================
    const navigate = useNavigate()
    const {albumsName} = useParams()
    //================redux=========================
    const selectorUser  = useSelector(selectUser)
    

    useEffect(()=>{
        songAll()
        .then(res=>{
            setArraySongs(res.data.songs)
            setVideo('http://www.youtube.com/embed/'+res.data.songs[0].url)
            setIdSong(res.data.songs[0].id)

            setListLikes(res.data.songs[0].song_likes)
            setArrayCommnet(res.data.songs[0].song_comments)

            if(selectorUser!== null){
                getLikeVisible(selectorUser.id, res.data.songs[0].id)
                .then(res=>{
                    //console.log(res.data.like)
                    if(res.data.like === true){
                        setLiked(true)
                       
                    }
                    else{
                        setLiked(false)
                    }
                })
            }
            
            
        })
        .catch(e=>{

        })

        albums()
        .then(res=>{
            
            if(albumsName){
                setArrayAlbums([])
                
                
                //
                res.data.albums.forEach(element => {
                    if(albumsName ===  element.title){
                        oneAlbum(element.id)
                        .then(res=>{
                            setArraySongs(res.data.songs)
                            setVideo('http://www.youtube.com/embed/'+res.data.songs[0].url)
                            setIdSong(res.data.songs[0].id)
                            
                        })
                    }    
                })
                
            }
            else{
                setArrayAlbums(res.data.albums)
                
            }
        })
        .catch(e=>{

        })
        
        
    }, [albumsName, selectorUser])
    function play(url, id, comment, like){
        setVideo('http://www.youtube.com/embed/'+url)
        setIdSong(id)

        songAll()
        .then(res=>{
            const index  = res.data.songs.findIndex(song=>song.id===id)
            setArrayCommnet(res.data.songs[index].song_comments)
        })
        
        if(selectorUser !== null){
            getLikeVisible(selectorUser.id, id)
            .then(res=>{
                //console.log(res.data.like)
                if(res.data.like === true){
                    setLiked(true)
                   
                }
                else{
                    setLiked(false)
                }
                
                
                
            })  
        }
        
    }

    function getAlbum(id){
        oneAlbum(id)
        .then(res=>{
            
            setArraySongs(res.data.songs)
        })
    }
    
    function sendComment(id,text){ 
        if(selectorUser !== null){
            addComment(text,selectorUser.id,idSong)
            .then(res=>{
                songAll()
                .then(res=>{
                    const index  = res.data.songs.findIndex(song=>song.id===id)
                    setArrayCommnet(res.data.songs[index].song_comments)
                })
            })
            
            
        }
        else{
            return navigate('../User/signIn')
        }
        
    }
    function likeAdd(idSong){
        if(selectorUser !== null){
            addLike(selectorUser.id, idSong)
            .then(res=>{
                setLiked(true)
                songAll()
                .then(res=>{
                    const index  = res.data.songs.findIndex(song=>song.id===idSong)
                    setListLikes(res.data.songs[index].song_likes)
                })
            }) 
        }
        else{
            return navigate('../User/signIn')
        }
    }
    function deleteLiked(idSong){
        deleteLike(selectorUser.id, idSong)
        .then(res=>{
            setLiked(false)
            songAll()
                .then(res=>{
                    const index  = res.data.songs.findIndex(song=>song.id===idSong)
                    setListLikes(res.data.songs[index].song_likes)
                })
        })
    }
    
    
    
    //============================render===========================
    const songs = arraySongs.map((i,index)=>{
        
        return <Song {...i} key={index} array={index} play={play}/>
    })
    const albumsRender  = arrayAlbums.map((i, index)=>{
        return  <Slyder {...i} key={index} getAlbum={getAlbum}/>
    })

    
    return(
        <>
            <Header/>
            <main className="music">
                <div className='slyder'>
                    {albumsRender}
                    
                </div>
                <div className="songs">
                    {songs}
                </div>
                <div className="video">
                    <Video url={video}/>
                    <Like idSong={idSong} 
                    likes={like} 
                    comment={arrayComment}  
                    sendComment={sendComment} 
                    likeAdd={likeAdd} 
                    deleteLiked={deleteLiked}
                    listLikes={listLikes}
                    />
                </div>
                <Outlet/>
            </main>
            
        </>
    )
}

export default memo(Songs) 