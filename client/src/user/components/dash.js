import { useState } from 'react'
import {
    deleteItem 
} from '../../components/animate'
import DashContent from './dashContent'
import { Outlet } from 'react-router-dom'

const DashUsers = ({lable,array,titles,addItem}) =>{
    //==============state=================================
    const [add, setAdd] = useState(false)
    //--------------input---------------------------------
    const [in1, setIn1] = useState('')
    const [in2, setIn2] = useState('')
    const [in3, setIn3] = useState('')
    //==============navigate==============================
    
    function deleteUser(index){
        deleteItem(index)
        //console.log(index)
    }
    //console.log(addItem)
    
    //==================render============================
    function setVisible(){
        if(lable === "users"){
            return
        }
        else{
            if(add){
                return <tr>
                    <td></td>
                    <td><input value={in1} onChange={(e)=>setIn1(e.target.value)}/></td>
                    <td><input value={in2} onChange={(e)=>setIn2(e.target.value)}/></td>
                    <td><select> 
                            <option value='{"num_sequence":[0,1,2,3]}'>Option one</option>
                            <option value='{"foo":"bar","one":"two"}'>Option two</option>
                        </select></td>
                    <td></td>
                    <td><button className='add' onClick={()=>addItem(in1,in2,in3)}>Add</button></td>
                    <td><button className='add' onClick={()=>setAdd(false)}>Cancel</button></td>
                </tr>
            }
            return <tr><td><button className='add' onClick={()=>setAdd(true)}>Add New</button></td></tr>
        }
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
                    {setVisible()}
                    {array.map((i, index)=>{
                        
                        return  <DashContent {...i} key={index} delete={()=>deleteUser(index)} index={index}/>
                    })}
                    <Outlet/>
                </tbody>
            </table>
        </>
    )
}


export default DashUsers