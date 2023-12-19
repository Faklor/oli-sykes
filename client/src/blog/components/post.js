export default function Post(props){
    
    return(
        <div className="post">
            <img src={props.img || ''} alt="postImage"/>
            <h1>{props.title || ''}</h1>
            <h2>description:</h2><textarea disabled defaultValue={props.description || ''}></textarea>

        </div>
    )
}