import Header from "../components/header"
import Slyder from './slyder'
import Song from './song'
import Video from './components/video'
import Like from './components/like'


import './music.scss'
//-----------------axios------------------------
import { 
    songAll,
    albums,
    oneAlbum
 } from '../components/axiosRouterGet' 
import { useEffect, useState, memo } from "react"
import { Outlet, useParams } from "react-router-dom"

//import axios from 'axios'

const Songs= props=>{
    //==============state===========================
    const [arraySongs, setArraySongs] = useState([])
    const [arrayAlbums, setArrayAlbums] = useState([])
    const [arrayComment, setArrayCommnet] = useState([])
    //--------------video---------------------------
    const [video, setVideo] = useState('http://www.youtube.com/embed/UNaYpBpRJOY?si=YqDdXzD_4ARsFoYk')
    const [idSong, setIdSong] = useState('')
    //==============navigate========================
    
    const {albumsName} = useParams()
    

    useEffect(()=>{
        songAll()
        .then(res=>{
            setArraySongs(res.data.songs)
            setVideo('http://www.youtube.com/embed/'+res.data.songs[0].url)
            setIdSong(res.data.songs[0].id)
            
            
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
        
        
    }, [albumsName])
    function play(url, id){
        setVideo('http://www.youtube.com/embed/'+url)
        setIdSong(id)
        console.log(idSong)
    }

    function getAlbum(id){
        oneAlbum(id)
        .then(res=>{
            
            setArraySongs(res.data.songs)
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
                    {/* <Like idSong={idSong}/> */}
                </div>
                <Outlet/>
            </main>
            
        </>
    )
}

export default memo(Songs) 