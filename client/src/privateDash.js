import { useSelector } from "react-redux"
import {
    selectUser
} from './store/nowUser'
import { Navigate } from "react-router-dom"

export default function PrivateRoute({component}){
    const select = useSelector(selectUser)

    function render(){
        if(select !== null){
            if(select.role === "ADMIN"){
                return <>{component}</>
            }
        }
        else{
            <Navigate to='/Home'/>
        }
    }
    return(
        <>
            {render()}
        </>
    )
}