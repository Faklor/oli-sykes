import { useRef } from "react"
//========================redux=========================
import { useDispatch, useSelector } from "react-redux"
import {
    selectEdit,
    setStateEdit
} from '../store/editAccount'
import {
    editImg,
    signIn
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
    //==================redux===========================
    const selectorEdit = useSelector(selectEdit)
    const selectorUser = useSelector(selectUser)
    const dispatch = useDispatch()
    //==================================================

    // useEffect(()=>{
    //     console.log(fileRef)
    // },[fileRef])
    function sendFileOnClient(){
        
        const formData = new FormData()
        const image = fileRef.current.files[0]
        formData.append("email", props.email)
        formData.append("pic", image)

        // for(let pair of formData.entries()) {
        //     console.log(`${pair[0]}: ${pair[1]}`)
        // }

        editImg(formData)
        signIn(props.email, '2351')
        .then(res=>[
            dispatch(setStateUser(res.data.user))
        ])
        
        console.log(selectorUser)
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
                <input type='button' onClick={sendFileOnClient} value='Edit'/>
            </div>
                
        }
    }
    console.log(selectorUser)

    function setImage(){
        if(selectorUser.imageBase64 !== null){
            return <img src={`data:${selectorUser.contentType};base64,${''}` || user} alt='imgUser'/>
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