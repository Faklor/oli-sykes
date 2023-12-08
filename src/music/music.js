import Header from "../components/header"
import Slyder from './slyder'
import './music.scss'
//import axios from 'axios'

const Songs= props=>{
    const albums = [
        {
            name:'Seen',
            img:'https://cdn52.zvuk.com/pic?type=release&id=3399082&ext=jpg&size=1920x1920'
        },
        {
            name:'Drown',
            img:'https://avatars.yandex.net/get-music-content/49876/2daf1198.a.2945723-2/m1000x1000?webp=false'
        },
        {
            name:'Amo',
            img:'https://avatars.yandex.net/get-music-content/175191/2c2f1ee3.a.6750328-1/m1000x1000?webp=false'
        },
        {
            name:'Dead',
            img:'https://cdn61.zvuk.com/pic?type=release&id=12578304&ext=jpg&size=1920x1920'
        },
        {
            name:'Hospital',
            img:'https://i.imgur.com/IiCmlpxh.jpg'
        },
        {
            name:'Al',
            img:'https://altwall.net/img/bring/34_1024.jpg',
        },
        {
            name:'Motion',
            img:'https://yt3.ggpht.com/a/AGF-l79qFB7YV_gfwzb8C3aYb4ze2lmeOBPLBgieBA=s900-c-k-c0xffffffff-no-rj-mo'
        }

    ]

    

    return(
        <>
            <Header/>
            <main className="music">
                <div className='slyder'>
                    {albums.map((i, index)=>{
                        return  <Slyder {...i} key={index}/>
                    })}
                    <button>left</button>
                    <button>right</button>
                </div>
                
               
            </main>
        </>
    )
}

export default Songs 