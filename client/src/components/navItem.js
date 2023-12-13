


const Item = props =>{
    
    return(
        
        <div className={'item'} onClick={props.getCheck}>
            <img src={props.img || props.filename} alt='nav'/>
            <p className='textMenu' >{props.name}</p>
        </div>
        
    )
}


export default Item