import Header from "../components/header"
import Slyder from './slyder'
import Song from './song'
import YouTube from 'react-youtube'

import './music.scss'

//import axios from 'axios'

const Songs= props=>{
    const albums = [
        {
            id:1,
            name:'Seen',
            img:'https://cdn52.zvuk.com/pic?type=release&id=3399082&ext=jpg&size=1920x1920',
            time:'3.10'
        },
        {
            id:2,
            name:'Drown',
            img:'https://avatars.yandex.net/get-music-content/49876/2daf1198.a.2945723-2/m1000x1000?webp=false',
            time:'3.10'
        },
        {
            id:3,
            name:'Amo',
            img:'https://avatars.yandex.net/get-music-content/175191/2c2f1ee3.a.6750328-1/m1000x1000?webp=false',
            time:'3.10'
        },
        {
            id:4,
            name:'Dead',
            img:'https://cdn61.zvuk.com/pic?type=release&id=12578304&ext=jpg&size=1920x1920',
            time:'3.10'
        },
        {
            id:5,
            name:'Hospital',
            img:'https://i.imgur.com/IiCmlpxh.jpg',
            time:'3.10'
        },
        {
            id:6,
            name:'Al',
            img:'https://altwall.net/img/bring/34_1024.jpg',
            time:'3.10'
        },
        {
            id:7,
            name:'Motion',
            img:'https://yt3.ggpht.com/a/AGF-l79qFB7YV_gfwzb8C3aYb4ze2lmeOBPLBgieBA=s900-c-k-c0xffffffff-no-rj-mo',
            time:'3.10'
        }

    ]
    
    const songs = albums.map((i,key)=>{
        
        return <Song {...i} key={key}/>
    })

    
    return(
        <>
            <Header/>
            <main className="music">
                <div className='slyder'>
                    {albums.map((i, index)=>{
                        return  <Slyder {...i} key={index}/>
                    })}
                    
                </div>
                <div className="songs">
                    {songs}
                </div>
                <YouTube videoId="2g811Eo7K8U"/>
                
               
            </main>
        </>
    )
}

export default Songs 