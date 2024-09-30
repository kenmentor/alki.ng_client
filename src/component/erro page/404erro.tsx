import React, { useState,useMemo } from "react"
import "./erro.css"
import { MdError } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa"
 

const Erro404 = ()=>{
    const navigate = useNavigate()
    let[count,setcount] = useState(10)
    useMemo(()=>{
        const timing = setTimeout(()=>{
            navigate('/')
        },10000)
       /* const counter = setInterval(() => {
            setcount((prev)=>prev-1)
            console.log('running')
        }, 1000);*/
       
    },[])
   
    return(
        <div className="errocontainer">
       <MdError size={100}/>
        <h1> 404 </h1>
        <h2>page not found</h2>
        <a href="/" className="back_to_home">
        <span className="text_back_home"> go back home page <FaArrowRight/></span>
        {count}</a>
        </div>
    )
}
export default Erro404