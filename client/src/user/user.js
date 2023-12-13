import Header from "../components/header"

import './scss/user.scss'
import { Outlet } from "react-router-dom"


const User= props=>{
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