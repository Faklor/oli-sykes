

export default function Video(props){
   
    return (
        <iframe className="ytplayer" 
        type="text/html" 
        style={{width:"640px", height:"360px"}}
        src={props.url}
        title="frameVideo" 
        frameBorder={0}/>
    )
}