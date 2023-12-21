import { ReactSVG } from "react-svg";
import like from '../../res/like.svg'
import likeChecked from '../../res/likeChecked.svg'

import user from '../../res/user.svg'
import {  useState } from "react"


export default function Like({idSong,likes,comment,sendComment,likeAdd,deleteLiked,listLikes}){
    //===================redux===========================
    
    //===================state===========================
    const [text, setText] = useState('')
    //===================navigate========================
    
    

    return(
        <>
        <div className="like">
            <div>
            {likes?<ReactSVG src={likeChecked} onClick={()=>deleteLiked(idSong)}/>: <ReactSVG src={like}  onClick={()=>likeAdd(idSong)} />}
            <h1>{listLikes}</h1>
            </div>
            <input defaultValue={''} onChange={(e)=>setText(e.target.value)} placeholder="Enter comment"/>
            <button onClick={()=>sendComment(idSong, text)}>send Comment</button>
            
        </div>
        <div className="allComments">
        {comment.map((i,index)=>{
            return <div className="comment" key={index}>
                <div className="userCommnet">
                    <img src={`data:${i.user.contentType};base64,${i.user.imageBase64}` || user} alt="commentUser"/>
                    <h2>{i.user.name}</h2>
                </div>
                <textarea disabled defaultValue={i.comment}></textarea>
            </div>
        })}
        </div>
        </>
    )
}