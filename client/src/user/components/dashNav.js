import '../scss/dashNav.scss'
//======================image========================
import dashGraph from '../../res/dashGraph.png'
import dashUser from '../../res/dashUser.png'
import dashMusic from '../../res/dashMusic.png'
import dashBlog from '../../res/dashBlog.png'
//=====================animate=======================
import {
    dashContent
} from '../../components/animate'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const DashNav = ()=>{
    //=================navigate======================
    const navigate = useNavigate()
    const location = useLocation()
    //==================state========================
    const [mus, setG] = useState([<div/>,'','',''])
    //===============================================
    useEffect(()=>{
        let simpleLoc = location.pathname.match(/\/\w+$/)[0].replace('/','')
       
        if(simpleLoc === "graph"){
            setG([<div/>,'','',''])
        }
        else if(simpleLoc === "users"){
            setG(['',<div/>,'',''])
        }
        else if(simpleLoc === "music"){
            setG(['','',<div/>,''])
        } 
        else if(simpleLoc === "blogs"){
            setG(['','','',<div/>])
        }


    },[location])

    function setContent(e){
        dashContent()
        if(e.target.children[0].alt){
            navigate(`${e.target.children[0].alt}`)   
        }
    }

    return(
        <nav className="dashnav">
            <div className='dashItem'  onClick={setContent}>
                <img src={dashGraph} alt="graph"/>
                {mus[0]}
            </div>
            <div className='dashItem' onClick={setContent}>
                <img src={dashUser} alt="users"/>
                {mus[1]}
            </div>
            <div className='dashItem' onClick={setContent}>
                <img src={dashMusic} alt="music"/>
                {mus[2]}
            </div>
            <div className='dashItem' onClick={setContent}>
                <img src={dashBlog} alt="blogs"/>
                {mus[3]}
            </div>
            
        </nav>
    )
}


export default DashNav