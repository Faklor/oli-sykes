import './slyder.scss'

export default function Slyder(props){
    
    return(
        
        <div className='album'>
            <img src={props.img} alt='album'/>
            <h1>{props.name}</h1>
        </div>
        
    )
}