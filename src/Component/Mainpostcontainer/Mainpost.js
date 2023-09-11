import React, { useEffect, useState } from 'react'
import "./Mainpost.css"
import Contentmain from "../Contentmain/contentmain"
import PostContainer from "../PostContainer/Contain"
import axios from 'axios'
import { useSelector } from 'react-redux'
function Mainpost() {
  const userDetails = useSelector((state)=>state.user);
  let user  =userDetails.user
  console.log(user);
  let id = user?.other?._id;
  const accessToken= user.accessToken;
  console.log(accessToken);
  const [post , setPost] = useState([]);
  useEffect(() => {
    const getPost= async()=>{
      try {
        const res= await axios.get(`http://localhost:7000/api/post/flw/${id}`, {
          headers:{
            token:accessToken
          }
        })
        setPost(res.data);
      } catch (error) {
        
      }
    }
    getPost();
  }, [])
  console.log(post);
  
  return (
    <div>
      <Contentmain/>
      {post.map((item)=>(
        <PostContainer post={item}/>
      ))}
      
    </div>
  )
}

export default Mainpost