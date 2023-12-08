const {Component} = require('react')

const Hoc = (props)=> (Companent)=>{
    return class HOC extends Component{
        
        render(){
           
            return <Companent status={props}/>
        }

        
    } 
    
}


export default Hoc