import { useEffect, useState } from 'react'


const HocSong = ({lable,method,titles,addItem})=> (Companent)=>{
    return function Comnponent(){
        //===================state===========================
        const [array, setArray] = useState([])


        useEffect(()=>{
            
            method()
            .then(res=>{
                setArray(res.data[lable])
            })
            .catch(e=>{
                console.log(e)
            })
           
           

           
        },[])
        
         
       
        return <Companent lable={lable} array={array} titles={titles} addItem={addItem}/>
 
        
    } 
    
}


export default HocSong