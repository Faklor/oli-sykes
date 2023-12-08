import './sign.scss'
import { Link, useNavigate} from "react-router-dom"
import { loginOpacity1 } from '../components/animate'

import human from '../res/human.png'
import lock from '../res/lock.png'
import login from '../res/login.png'
import mail from '../res/mail.png'
import { useEffect, useState, memo } from 'react'
//----------------redux----------------------------------
import { useDispatch, useSelector } from 'react-redux'
import { 
    setStateUser,
    selectUser
 } from '../store/nowUser'

function SignIn(props){
    //==================navigation=======================
    const navigate = useNavigate()
    //==================state============================
    const [emailHook, setEmailHook] = useState('')
    const [loginHook, setLoginHook] = useState('')
    const [lockHook, setLockHook] = useState('')

    //===================redux===========================
    const dispatch =  useDispatch()
    const selectorUser = useSelector(selectUser)
    //===================================================
    

    useEffect(()=>{
        loginOpacity1()
        if(selectorUser != null){
           return navigate('../User/')
        }
        
    }) 
    //======================function=====================
    function setLogin(e){
        setLoginHook(e.target.value)
       
    }
    function setLock(e){
        setLockHook(e.target.value)
    }
    function setEmail(e){
        setEmailHook(e.target.value)
    }
    function getUser(e){
        //axios

        
        const user = {
            name: loginHook,
            img:'https://avatars.mds.yandex.net/i?id=375fb08833dbc1cd62deab93a1d659178abc3a02-9181195-images-thumbs&n=13'
        }
        dispatch(setStateUser(user))
        
        //selector = user
        return  navigate('../'+user.name)

    }
    //-------------------set-Register-or-Login-------------------------------
    function setSign(){
        if(props.status[0] === "Register"){
            return <div><img src={mail} alt="mail"/><input placeholder="Enter your Mail" type='email' value={emailHook} onChange={setEmail}/></div>
        }
        return<></>
    }
    

    return(
        
        <div className="sign">
            
            <img src={login} alt='login'/>
            <h1>{props.status[0]}</h1>
            {setSign()}
            <div>
                <img src={human}  alt='human'/>
                <input placeholder="Enter your Login"  type='text' value={loginHook} onChange={setLogin} />
            </div>
            <div>
                <img src={lock} alt='lock'/>
                <input placeholder="Enter your Password" type="password" value={lockHook} onChange={setLock}/>
            </div>

            <button onClick={getUser}>{props.status[1]}</button>
           
            <Link to={`/User/${props.status[3]}`}> {props.status[2]} </Link>
            
        </div>
    )
}

export default memo(SignIn)