import { useRef, useState } from "react"
//========================redux=========================
import { useDispatch, useSelector } from "react-redux"
import {
    selectEdit,
    setStateEdit
} from '../store/editAccount'
import {
    editImg,
} from '../components/axiosRouterPost'
import {
    selectUser,  
    setStateUser
} from '../store/nowUser'
//======================================================
import user from '../res/user.svg'

export default function Content(props){
    //==================state===========================
    const fileRef = useRef(null)
    const [error, setError] = useState('')
    //==================redux===========================
    const selectorEdit = useSelector(selectEdit)
    const selectorUser = useSelector(selectUser)
    const dispatch = useDispatch()
    //==================================================

    function sendFileOnClient(){
        
        const formData = new FormData()
        const image = fileRef.current.files[0]
        formData.append("email", props.email)
        formData.append("pic", image)

        editImg(formData)
        .then(res=>{
           
            if(res.data.error){
                setError('Image size is too big < 50kB and Only Jpg')
            }
            else{
                setError('')
                editImg(formData)
                .then(res=>{
                    dispatch(setStateUser(res.data.user))
                })
                .catch(e=>{
                    
                })
            }
            
            
        })
        .catch(e=>{

        })
        
        //console.log(selectorUser)
    }
    //--------------------------------------------------
    function setEdit(){
        dispatch(setStateEdit())
    }

    //===============render=============================
    function setContent(){
        if(!selectorEdit){
            return <></>
        }
        else{
            return <div>
                <input type='file' ref={fileRef}/>
                <p className="error">{error}</p>
                <button onClick={sendFileOnClient}>Edit</button>
            </div>
                
        }
    }
    //console.log(selectorUser)

    function setImage(){
        if(selectorUser.imageBase64 !== null){
            return <img src={`data:${selectorUser.contentType};base64,${selectorUser.imageBase64}`} alt='imgUser'/>
        }
        return <img src={user} alt="imgUser"/>
    }

    return(
        <>
            <div className="cabinet">
                
                <div>
                    {setImage()}
                    
                    <button onClick={setEdit}>Edit <br/>Image</button>
                </div>
                
                {setContent()}
                <h1>{props.name}</h1>
                <h2>Email: {props.email}</h2>
            </div>
        </>
        
    )
}