import Header from "../components/header"

import './user.scss'
//===============components====================
//=============================================
import { Outlet } from "react-router-dom"
//----------------redux----------------------------------
//---------------HOC-------------------------------------


const User= props=>{
    //===============stete====================
    //const [check, setCheck] = useState(true)
    //===============navigat==================
    //const location = useLocation()
    //===============redux====================
    
    //========================================


    

    return(
        <>
            <Header/>
            <main className="user">
                
                <Outlet/>
            </main>
         
        </>
    )
}

export default User