import {
    deleteItem 
} from '../../components/animate'

const DashUsers = ({array}) =>{

    function deleteUser(index){
        deleteItem(index)
        //console.log(index)
    }
    
    
    //==================render============================
    
    

    return(
        <>
            <table className='dashUsers'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>login</th>
                        <th>email</th>
                        <th>created</th>
                        <th>lastEdit</th>
                        <th>edit</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {array.map((i, index)=>{
                        return  <tr className="tableItem" key={index}>
                        <td>{i.id}</td>
                        <td>{i.name}</td>
                        <td>{i.email}</td>
                        <td>{i.createdAt}</td>
                        <td>{i.updatedAt}</td>
                        <td><button onClick={()=>{}}>Edit</button></td>
                        <td><button onClick={()=>deleteUser(index)}>Delete</button></td>
                    </tr>
                    })}
                </tbody>
            </table>
        </>
    )
}


export default DashUsers