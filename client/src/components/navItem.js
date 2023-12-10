


const Item = props =>{

    return(
        
        <div className={'item '+ props.name} onClick={props.getCheck}>
            <img src={props.img} alt='nav'/>
            <p className='textMenu' >{props.name}</p>
        </div>
        
    )
}


export default Item