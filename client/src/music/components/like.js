import { ReactSVG } from "react-svg";
import like from '../../res/like.svg'
import { addLike, getLikeVisible } from "../../components/axiosRouterPost"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { selectUser } from "../../store/nowUser"

//import axios from "axios"
import { useEffect } from "react"
import { setLike } from "../../components/animate"


export default function Like({idSong}){
    //===================redux===========================
    const selectorUser = useSelector(selectUser)
    //===================state===========================
    

    useEffect(()=>{
        if(selectorUser !== null){
            getLikeVisible(selectorUser.id, idSong)
            .then(res=>{
                if(res.data.like){
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
    }

    return(
        <>
            <ReactSVG src={like} className="like" onClick={likeAdd} />
            
        </>
    )
}