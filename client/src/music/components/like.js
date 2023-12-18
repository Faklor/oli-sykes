import { ReactSVG } from "react-svg";
import like from '../../res/like.svg'
import { addLike } from "../../components/axiosRouterPost"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { selectUser } from "../../store/nowUser"
import { getLikeVisible } from "../../components/axiosRouterGet"
import { useEffect } from "react";

export default function Like({idSong}){
    //===================redux===========================
    const selectorUser = useSelector(selectUser)

    useEffect(()=>{
        if(selectorUser !== null){
            getLikeVisible(selectorUser.id, idSong)
            .then(res=>{
                console.log(res.data)
            })    
        }
        
    },[idSong, selectorUser])    

    function likeAdd(){
        if(selectorUser !== null){
            addLike(selectorUser.id, idSong)
            .then(res=>{
                console.log(res)
            })
        }
    }

    return(
        <>
            <ReactSVG src={like} className="like" onClick={likeAdd}/>
        </>
    )
}