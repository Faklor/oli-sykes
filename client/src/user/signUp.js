import './sign.scss'
import { Link } from "react-router-dom"
import { loginOpacity1 } from '../components/animate'

import human from '../res/human.png'
import lock from '../res/lock.png'
import mail from '../res/mail.png'
import signUpImg from '../res/signUp.png'
import { useEffect } from 'react'


export default function SignUp(){
    useEffect(()=>{
        loginOpacity1()
    })
    return(
        <div className="sign">
            <img src={signUpImg} alt='register'/>
            <h1>Register</h1>
            <div>
                <img src={mail} alt="mail"/>
                <input placeholder="Enter your Mail"/>
            </div>
            <div>
                <img src={human} alt="human"/>
                <input placeholder="Enter Login"/>
            </div>
            <div>
                <img src={lock} alt="lock"/>
                <input placeholder="Enter Password" type="password"/>
            </div>

            <button>Sign In</button>
           
            <Link to={`/User/signIn`}> Sign In </Link>

        </div>
    )
}