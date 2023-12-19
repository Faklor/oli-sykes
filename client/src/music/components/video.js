

export default function Video(props){
   
    return (
        <iframe className="ytplayer" 
        type="text/html" 
        width="640" 
        height="360"
        src={props.url} 
        frameBorder="0"/>
    )
}