import { useEffect, useState } from 'react'
import {albums} from '../../components/axiosRouterGet'


const HocSong = ({lable,method,titles,addItem, deleteItemMethod,editItem})=> (Companent)=>{
    return function Comnponent(){
        //===================state===========================
        const [allAlbums,  setAllAlbums] = useState([])


        useEffect(()=>{
           
            albums()
            .then(res=>{
                setAllAlbums(res.data.albums)
            })
            .catch(e=>{

            })

        },[])
        
         
       
        return <Companent 
            lable={lable} 
            method={method} 
            titles={titles} 
            addItem={addItem} 
            albums={allAlbums} 
            deleteItemMethod={deleteItemMethod} 
            editItem={editItem}
        />
 
        
    } 
    
}


export default HocSong