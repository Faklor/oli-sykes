export default function Error({errors}){
    
    const setErrors = errors.map((error, key)=>{
        return <p className="error" key={key}>{error}</p>
    })  

    return(
        <>
            {setErrors}
        </>
    )
}