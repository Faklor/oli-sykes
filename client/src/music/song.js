import './song.scss'
import play from '../res/play.png'

const Song =(props)=>{
    return(
        <div className="song">
            <h1>{props.array}</h1>
            <img src={play} alt='somgImg' onClick={()=>props.play(props.url)}>
                
            </img>
            <div className='name'>
                <h2>{props.title}</h2>
                <h3>Bring me the horizon</h3>
            </div>
            
           
        </div>
        
    )
}

export default Song