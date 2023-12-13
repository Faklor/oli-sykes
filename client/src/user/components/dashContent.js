import { Link, createSearchParams, useNavigate } from "react-router-dom";



export default  function DashContent(props){
    //console.log(props)
    
    const navigate = useNavigate()
    const param = navigate.search = createSearchParams({item:props.id})

    console.log(param)
    return(
        <>
        <tr className="tableItem">
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>{props.createdAt}</td>
            <td>{props.updatedAt}</td>
            
            <td><button onClick={props.delete}>Delete</button></td>
            <td><button onClick={()=>{navigate({pathname:'/User/dashboard/users', search:createSearchParams({item:props.id})})}}>Edit</button></td>
            
        </tr>
        
        </>
    )
}