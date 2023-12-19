import './slyder.scss'
import { Link } from 'react-router-dom'

export default function Slyder(props){
    //===============state============================

    
    return(
        <Link to={{
            pathname:`${props.title}`
        }}>
        <div className='album' onClick={()=>props.getAlbum(props.id)}>
            
            <img src={props.img} alt='album'/>
            <h2>{props.title}</h2> 
        </div> 
        </Link>
    )
}