import React, { useEffect, useState } from 'react'
import "./Profilemain.css"
import image4 from "../Images/image5.jpg"
import ProfilePostContainer  from "../ProfilePostContainer/Contain"
import Contentmain from "../Contentmain/contentmain"
import axios from 'axios'
import { useLocation } from 'react-router-dom'
function Profilemain() {
const[post , setPost] = useState([]);
let location =useLocation();
let id = location.pathname.split("/")[2];

useEffect(()=>{
  const getPost = async()=>{
  try {
    const res = await axios.get(`http://localhost:7000/api/post/get/post/${id}` )
    
    setPost(res.data);
  } catch (error) {
    console.log("error occured")
  }}
  getPost();
},[]) 
const[user , setuser]  = useState([]);
useEffect(() => {
   const getuser  =async()=>{
    try {
      const res = await axios.get(`http://localhost:7000/api/user/post/user/details/${user}`)
    setuser(res.data);
    } catch (error) {
      console.log("some error occured")
    }
   }
   getuser();
}, [])



return (
    <div className='profilemain'>
     <div style={{marginTop:"30px"}} >
        <img style={{height:"20vh",width:"100%",objectFit:"cover",borderRadius:"25px"}} src={`${image4}`}/>
        <h3 style={{marginTop:"-60px",fontSize:"30px",marginLeft:"20px",color:"white"}}>Your Profile</h3>
     </div>
     <div>
        <Contentmain/>
       {post.map((item)=>( 

         <ProfilePostContainer details={item}/>
       ))} 
       
      </div>
    </div>
  )
}

export default Profilemain