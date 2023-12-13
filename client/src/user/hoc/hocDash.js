import { useEffect, useState } from 'react'


const HocSong = ({lable,method})=> (Companent)=>{
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
           
           

           
        },[array])
        
         
       
        return <Companent array={array}/>
 
        
    } 
    
}


export default HocSong