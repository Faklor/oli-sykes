import './cabinet.scss'
//----------------redux----------------------------------
import { useSelector, useDispatch } from 'react-redux'
import {selectUser,  setStateUser} from '../store/nowUser'
//===============navigate================================
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

export default function Cabinet(){
    //-----------------redux--------------------------
    const selectorUser = useSelector(selectUser)
    const dispatch = useDispatch()
    //================navigate========================
    const navigate = useNavigate()
    let { userName } = useParams()
    //==================state=========================
    //================================================
   

    useEffect(()=>{
        if(selectorUser === null){
            
           return navigate('../User/signIn')
        }
    })
    
    //================function========================
    function outAccount(){
        dispatch(setStateUser(null))
        return navigate('../signIn')
    }
    //===============render-function==================
    function render(){
        if(userName !== selectorUser.name){
            return <h1>User not Found</h1>
        }
        return <div className="cabinet">
            <img src={selectorUser.img} alt='imgUser'/>
            <h1>{selectorUser.name}</h1>
            <button onClick={outAccount}>Edit</button>
            <button onClick={outAccount}>Log out</button>
        </div>
    }
   

    return(
        <>
            {render()}
        </>
    )
} 