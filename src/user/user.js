import Header from "../components/header"

import './user.scss'
//===============components====================
import SignIn from './signIn'
//import SignUp from './signUp'
import Cabinet from "./cabinet"
import { useLocation } from "react-router-dom"
//----------------redux----------------------------------

//---------------HOC-------------------------------------
import hoc from './HocSing'
let SignUp = hoc(['Register','SignUp', 'Sign In', 'signIn'])(SignIn)

const User= props=>{
    //===============stete====================
    //const [check, setCheck] = useState(true)
    //===============navigat==================
    const location = useLocation()
    //===============redux====================
    
    //========================================
    
    
    
    function setSign(){
        //Object.hasOwn(selectorNowUser, 'login')
        if(location.pathname === "/User/signIn"){
            
            return <SignIn status={['Login','SignIn', 'Create Account', 'signUp']}/>
        }
        else if(location.pathname === "/User/signUp"){
            return <SignUp/>
        }
        else{
            return <Cabinet/>
        }
    }

    

    return(
        <>
            <Header/>
            <main className="user">
                {setSign()}
            </main>
         
        </>
    )
}

export default User