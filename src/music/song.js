import './song.scss'
import Button from './button'

const Song =props=>{
   
    return(
        <div className="song">
            <h1>{props.id}</h1>
            <img src={props.img} alt='somgImg'>
                
            </img>
            <Button/>
            <div className='name'>
                <h2>{props.name}</h2>
                <h3>Bring me the horizon</h3>
            </div>
            
            <h4>{props.time}</h4>
           
        </div>
        
    )
}

export default Song