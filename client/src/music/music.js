import Header from "../components/header"
import Slyder from './slyder'
import Song from './song'
import Video from './components/video'
import Like from './components/like'

import './music.scss'
//-----------------axios------------------------
import { 
    songAll,
    albums
 } from '../components/axiosRouterGet' 
import { useEffect, useState, memo } from "react"

//import axios from 'axios'

const Songs= props=>{
    //==============state===========================
    const [arraySongs, setArraySongs] = useState([])
    const [arrayAlbums, setArrayAlbums] = useState([])
    //--------------video---------------------------
    const [video, setVideo] = useState('http://www.youtube.com/embed/UNaYpBpRJOY?si=YqDdXzD_4ARsFoYk')
    const [idSong, setIdSong] = useState('')
    

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
            setArrayAlbums(res.data.albums)
        })
        .catch(e=>{

        })
    }, [])
    function play(url, id){
        setVideo('http://www.youtube.com/embed/'+url)
        setIdSong(id)
    }
    
    
    //============================render===========================
    const songs = arraySongs.map((i,index)=>{
        
        return <Song {...i} key={index} array={index} play={play}/>
    })

    
    return(
        <>
            <Header/>
            <main className="music">
                <div className='slyder'>
                    {arrayAlbums.map((i, index)=>{
                        return  <Slyder {...i} key={index}/>
                    })}
                    
                </div>
                <div className="songs">
                    {songs}
                </div>
                <div className="video">
                    <Video url={video}/>
                    <Like idSong={idSong}/>
                </div>
               
            </main>
        </>
    )
}

export default memo(Songs) 