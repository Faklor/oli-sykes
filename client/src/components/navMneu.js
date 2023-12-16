import './navMenu.scss'
//====================================
import home from '../res/home.svg'
import user from '../res/user.svg'
import music from '../res/music.svg'
import blog from '../res/blog.svg'
//====================================
import { useEffect, useState } from 'react'
import Item from './navItem'
import {
    animateBarCheck,
    animateBarUnCheck,
    
}
from './animate'
import { useNavigate,useLocation } from "react-router-dom"
//----------------redux--------------------------------------
import { useDispatch, useSelector } from 'react-redux'
import {
    selectItems,
    
} from '../store/nowPointMenu'
import {
    selectUser,
    setDefaultImage
} from '../store/nowUser'
//-----------------------------------------------------------



const NavMenu = props =>{
    //=================navigate==========================
    const navigate = useNavigate()
    const location = useLocation()
    //=================state=============================
    const [check, setCheck] = useState(false)
    //-------redux-----------------------
    let selector = useSelector(selectItems)
    let selectorUser = useSelector(selectUser)
    const dispatch = useDispatch()
    //================default-values=====================

    let defaultList = [
        {
            img:home,
            name:'Home'
        },
        {
            img:music,
            name:'Music'
        },
        {
            img:blog,
            name:'Blog'
        },
        {
            img:user,
            name:'User'
        }
    ]
    //------------------------------------------------------------------------
    let index = defaultList.findIndex(el=>location.pathname.match(/\/\w+\/*/)[0] === `/${el.name}`|| location.pathname.match(/\/\w+\/*/)[0] === `/${el.name}/`)
    let a = defaultList[0]
    defaultList[0] = defaultList[index]
    defaultList[index] = a
    selector = defaultList

    if(selectorUser !== null){
        let a = selectorUser.name.split('')
        if(a.length > 5){
            a = a[0]+a[1]+a[2]+a[3]+'...'
        }
        

        defaultList.forEach((i, key)=>{
            if(i.name === 'User'){
               defaultList.splice(key,1,{...selectorUser, name:a})
            }
        })
        

        //image
    }

    //------------------------------------------------------------------------
    //===================================================
    useEffect(()=>{
        dispatch(setDefaultImage(user))
        //-------------navClick--------------------------
        window.onclick = (e)=>{
            let a = e.target.className
            if(a !== "item"){
                animateBarUnCheck()
                setCheck(false)
            }

        }

    },[dispatch, selectorUser])
    //=====================render======================== 
    const items = selector.map((i, index)=>{
        
        return <Item {...i} key={index} getCheck={()=>getCheck(index)}/>
    })
    //======================function=====================
    function getCheck(index){
        if(check){
            setCheck(false)
            animateBarUnCheck()
        }
        else{
            setCheck(true)
            animateBarCheck()
        }
        //==========replace_item==============
        let a = selector[0]
        selector[0] = selector[index]
        selector[index] = a
        //-----------navigate-----------------
        
        if(selector[0] !== selector[index]){
            if(selector[0].name !== "Home" && selector[0].name !== "Music" && selector[0].name !== "Blog"){
                if(selectorUser !== null && selectorUser.role === "USER"){
                    
                    return navigate ('../User/'+selectorUser.name)
                }
                else if(selectorUser !== null && selectorUser.role === "ADMIN"){
                    return navigate ('../User/dashboard/graph')
                }
                else{
                    return navigate('../User/signIn')
                }
                
                
            }
            //selector[0].name === "User" || copyDefaulList[3].name != selectorUser.name)
           
            return  navigate('../'+selector[0].name)
            
            
            
        }
        //====================================
    }
    //===================================================
   

    return(
        <div className="navMenu"> 
            {items}
        </div>
        
    )
}

export default NavMenu