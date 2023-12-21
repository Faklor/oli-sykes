import { useEffect, useState } from "react"
import Header from "../components/header"
import './scss/blog.scss'
import { blogs } from "../components/axiosRouterGet"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import Post from "./components/post"

const Blog= props=>{
    //=====================state===============
    const [array, setArray] =  useState([])
    const {numberPosts} = useParams()   
    //===================navigate==============
    const navigate = useNavigate()

    useEffect(()=>{
        blogs()
            .then(res=>{
                
                if(numberPosts){
                    let newArray = []
                    for(let i=0; i<numberPosts;i++){
                        
                        newArray.push(res.data.posts[i])
                    }
                    
                    setArray(newArray)
                }
                else{
                    setArray(res.data.posts)
                }
                
            })
            .catch(e=>{
    
            })
        
        
    },[numberPosts, array.length])

    

    return(
        <>
        <Header/>
        
        <main className="blog">
        
            {/* <Filter/> */}
            {array.map((i,index)=>{
                return <Post {...i} key={index}/>
            })}
            <Outlet/>
            
                
        </main>
        
        </>
    )
}

export default Blog