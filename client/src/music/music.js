import Header from "../components/header"
import Slyder from './slyder'
import Song from './song'
import Video from './components/video'

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
    

    useEffect(()=>{
        songAll()
        .then(res=>{
            setArraySongs(res.data.songs)
            setVideo('http://www.youtube.com/embed/'+res.data.songs[0].url)
            
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
    function play(url){
        setVideo('http://www.youtube.com/embed/'+url)
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
                <Video url={video}/>
               
            </main>
        </>
    )
}

export default memo(Songs) 