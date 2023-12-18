import './slyder.scss'

export default function Slyder(props){
    
    return(
        
        <div className='album'>
            
            <img src={props.img} alt='album'/>
            <h2>{props.title}</h2> 
        </div> 
        
    )
}