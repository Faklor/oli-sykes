import { ReactSVG } from "react-svg";
import like from '../../res/like.svg'
import { addLike, getLikeVisible } from "../../components/axiosRouterPost"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { selectUser } from "../../store/nowUser"

import user from '../../res/user.svg'
//import axios from "axios"
import { useEffect, useState } from "react"
import { setLike } from "../../components/animate"
import { useNavigate } from "react-router-dom";


export default function Like({idSong,likes,comment,sendComment}){
    //===================redux===========================
    const selectorUser = useSelector(selectUser)
    //===================state===========================
    const [text, setText] = useState('')
    //===================navigate========================
    const navigate  = useNavigate()

    useEffect(()=>{
        if(selectorUser !== null){
            getLikeVisible(selectorUser.id, idSong)
            .then(res=>{
                //console.log(res.data.like)
                if(res.data.like === true){
                    setLike()
                }
            })
            //addLikes and comments    
        }
        
        
    },[idSong, selectorUser])    

    function likeAdd(){
        if(selectorUser !== null){
            addLike(selectorUser.id, idSong)
            .then(res=>{
                setLike()
            })
        }
        else{
            return navigate('../User/signIn')
        }
    }

    return(
        <>
        <div className="like">
            <div>
            <ReactSVG src={like}  onClick={likeAdd} />
            <h1>{likes}</h1>
            </div>
            <input defaultValue={text} onChange={(e)=>setText(e.target.value)} placeholder="Enter comment"/>
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