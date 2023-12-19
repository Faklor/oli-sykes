import { useState, useEffect } from 'react'
import {
    deleteItem 
} from '../../components/animate'
import { Outlet } from 'react-router-dom'

const DashUsers = ({lable,method,titles,addItem,deleteItemMethod, albums,editItem}) =>{
    //==============state=================================
    const [add, setAdd] = useState(false)
    const [edit, setEdit] = useState(false)
    const [array, setArray] = useState([])
    
    //--------------input---------------------------------
    const [in1, setIn1] = useState("")
    const [in2, setIn2] = useState("")
    const [textAr, setTextAr] = useState("")
    const [select, setSelect] = useState()
   
    //==============navigate==============================
    
    function deleteMethod(index, id){
        deleteItem(index)
        deleteItemMethod(id)
        
    }
    function editMethod(id, title, url){
        
        if(in1 === ""  || in2 === ""){
            editItem(id,title,url,select)
            .then(res=>{
                method()
                .then(res=>{
                    setArray(res.data[lable])
                })
                .catch(e=>{
                    
                })
            })
            .catch(e=>{
    
            })
        }
        else{
            editItem(id,in1,in2,select)
            .then(res=>{
                method()
                .then(res=>{
                    setArray(res.data[lable])
                })
                .catch(e=>{
                    
                })
            })
            .catch(e=>{
    
            })
        }
        
       
        
    }
    useEffect(()=>{
        
        
        method()
        .then(res=>{
            setArray(res.data[lable])
            setSelect(albums[0].id)
        })
        .catch(e=>{

        })
        
    },[albums, method, lable])
    //console.log(select)
    //==================render============================
    function setVisibleAdd(){
        if(lable === "users"){
            return
        }
        else{
            if(add){
                return <tr>
                    <td><button className='add' onClick={()=>setAdd(false)}>Cancel</button></td>
                    <td><input value={in1} onChange={(e)=>setIn1(e.target.value)}/></td>
                    <td><input value={in2} onChange={(e)=>setIn2(e.target.value)}/></td>
                    <td>{lable==="songs" &&<select onChange={(e)=>setSelect(e.target.value)}> 
                            {albums.map((i,index)=>{
                              
                                return <option value={i.id} key={index}>{i.title} </option>
                                
                                                               
                            })}
                        </select>}
                        {lable ==="posts"&&
                        <textarea value={textAr} onChange={(e)=>setTextAr(e.target.value)}/>}
                    </td>
                    <td></td>
                    <td><button className='add' onClick={()=>{
                        if(lable ==="posts"){
                            addItem(in1,textAr,in2).then(res=>method().then(res=>setArray(res.data[lable])))
                        }
                        else{addItem(in1,in2,select).then(res=>method().then(res=>setArray(res.data[lable])))}}}>Add</button></td>
                    
                </tr>
            }
            return <tr><td><button className='add' onClick={()=>setAdd(true)}>Add New</button></td></tr>
        }
    }
    function setVisibleEdit(){
        if(lable === "users"){
            return
        }
        else{
            if(edit){
                return <tr><td><button className='add' onClick={()=>setEdit(false)}>Cancel</button></td></tr>
            }
            return <tr><td><button className='add' onClick={()=>setEdit(true)}>Edit</button></td></tr>
        }
        
    }
    function setEditofArray(){
        
        return array.map((i, index)=>{

            if(edit){
                return <tr className="tableItem" key={index}>
                <td>{i.id}</td>
                <td><input onChange={(e)=>setIn1(e.target.value)} defaultValue={i.title}/></td>
                <td><input onChange={(e)=>setIn2(e.target.value)} defaultValue={i.url}/></td>
                <td>{lable==="songs" &&<select onChange={e=>setSelect(e.target.value)}> 
                            {albums.map((i,index)=>{
                                return <option value={i.id} key={index}>{i.title}</option>
                            })}
                        </select>}
                    {lable!=="songs"&&i.createdAt}
                    {lable==="posts"&&
                    <textarea defaultValue={i.description} onChange={(e)=>setTextAr(e.target.value)}/>}
                    
                </td>
                <td>{i.updatedAt}</td>
                
                <td>
                    <button onClick={()=>deleteMethod(index,i.id)}>Delete</button>
                    <button onClick={()=>{
                        if(lable ==="posts"){
                            editMethod(i.id, array[index].title,array[index].description, array[index].url)
                        }
                        else{editMethod(i.id, array[index].title, array[index].url)}}}>Edit</button>
                </td>
                
            </tr>
            }
            return  <tr className="tableItem" key={index}>
            <td>{i.id}</td>
            <td>{i.name || i.title}</td>
            <td>{i.email || i.url || i.img}</td>
            <td>{i.createdAt}</td>
            <td>{i.updatedAt}</td>
            
            <td><button onClick={()=>deleteMethod(index,i.id)}>Delete</button></td>
            
        </tr>
        })
    }

    return(
        <>
            <table className='dashUsers'>
                <thead>
                    <tr>
                        {titles.map((i,index)=>{
                            return <th key={index}>{i}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {setVisibleEdit()}
                    {setVisibleAdd()}
                    {/* //render */}
                    {setEditofArray()}
                    <Outlet/>
                </tbody>
            </table>
        </>
    )
}


export default DashUsers