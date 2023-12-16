import user from '../res/user.svg'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { selectUser } from '../store/nowUser'


const Item = props =>{
    const select = useSelector(selectUser)
    function srcSet(){
        if(select.imageBase64){
            return `data:${props.contentType};base64,${props.imageBase64}`
        }
        return user
    }

    return(
        
        <div className={'item'} onClick={props.getCheck}>
            <img src={props.img || srcSet()} alt='nav'/>
            <p className='textMenu' >{props.name}</p>
        </div>
        
    )
}


export default Item