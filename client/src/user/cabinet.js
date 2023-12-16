import './scss/cabinet.scss'
//----------------redux----------------------------------
import { useSelector, useDispatch } from 'react-redux'
import {
    selectUser,  
    setStateUser
} from '../store/nowUser'
//===============navigate================================
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
//==============componet=================================
import Content from './content'

export default function Cabinet(){
    //-----------------redux--------------------------
    const selectorUser = useSelector(selectUser)
    const dispatch = useDispatch()
    //================navigate========================
    const navigate = useNavigate()
    const location = useLocation()
    let { userName } = useParams()
    //==================state=========================
    //================================================ 
   

    useEffect(()=>{
        if(selectorUser === null){
            
           return navigate('../User/signIn')
        }
        else{
            return navigate('../'+selectorUser.name)
        }
    },[navigate, selectorUser])
    
    //================function========================
    function outAccount(){ 
        if(selectorUser.role === "ADMIN"){
            const loc = '/User/'+location.pathname.match(/\/\w+$/)[0].replace('/','')
            if(location.pathname === loc){
                dispatch(setStateUser(null))
                return navigate('../signIn')
            }
            dispatch(setStateUser(null))
            return navigate('../../signIn')
        }
        dispatch(setStateUser(null))
        return navigate('../signIn')
        
    }
    
    //===============render-function==================
    function render(){
        if(userName !== selectorUser.name){
            return <h1 className='cabinet'>User not Found</h1>
        }
        return <Content {...selectorUser} />
    }
    

    return(
        <>
            {render()}
            <button className='logOut' onClick={outAccount}>Log out</button>
        </>
    )
} 