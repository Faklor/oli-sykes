import { useSelector } from "react-redux"
import {
    selectUser
} from './store/nowUser'
import { Navigate } from "react-router-dom"

export default function PrivateRoute({component}){
    const select = useSelector(selectUser)
  
    return select? <>{component}</> :  <Navigate to='/Home'/>
}