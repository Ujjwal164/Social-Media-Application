import React, { useEffect, useState } from 'react'
import "./Leftbar.css"
import image1 from "../Images/image1.jpg"
import image2 from "../Images/image2.jpg"
import image3 from "../Images/image3.jpg"
import image4 from "../Images/image4.jpg"
import image5 from "../Images/image5.jpg"
import axios from 'axios'
import { useSelector } from 'react-redux'
function Leftbar() {
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
        <div className='notification'> 
            <div className='notificationtext'> 
              <p style={{fontSize:"20px",marginLeft:"-16px",marginTop:"12px",fontWeight:"bold"}}>Notifications</p>
              <p style={{color:"grey",marginLeft:"7px"}}>See All</p>
            </div>
            <div style={{display:"flex",alignItems:"center",marginTop:"-5px"}}>
                <img className='notificationprofile' src={image1}/>
                <p style={{textAlign : "start",width:"160px"}}>Rohit likes your post</p>
                <img className="likeimage" src={image2}/>
            </div>
            <div style={{display:"flex",alignItems:"center",marginTop:"-5px"}}>
                <img className='notificationprofile' src={image2}/>
                <p style={{textAlign : "start",width:"160px"}}>Rohit started following you</p>
                <img className="likeimage" src={image1}/>
            </div>
            <div style={{display:"flex",alignItems:"center",marginTop:"-5px"}}>
                <img className='notificationprofile' src={image3}/>
                <p style={{textAlign : "start",width:"160px"}}>Rohit likes your post</p>
                <img className="likeimage" src={image3}/>
            </div>
            <div style={{display:"flex",alignItems:"center",marginTop:"-5px"}}>
                <img className='notificationprofile' src={image4}/>
                <p style={{textAlign : "start",width:"160px"}}>sakhsham start foloowing you</p>
                <img className="likeimage" src={image4}/>
            </div>
            <div style={{display:"flex",alignItems:"center",marginTop:"-5px"}}>
                <img className='notificationprofile' src={image5}/>
                <p style={{textAlign : "start",width:"160px"}}>Rohit likes your post</p>
                <img className="likeimage" src={image2}/>
            </div>
            <div style={{display:"flex",alignItems:"center" ,marginTop:"-5px"}}>
                <img className='notificationprofile' src={image1}/>
                <p style={{textAlign : "start",width:"160px"}}>Rohit likes your post</p>
                <img className="likeimage" src={image3}/>
            </div>
            <div style={{display:"flex",alignItems:"center",marginTop:"-5px"}}>
                <img className='notificationprofile' src={image3}/>
                <p style={{textAlign : "start",width:"160px"}}>Rohit likes your post</p>
                <img className="likeimage" src={image2}/>
            </div>
            <div style={{display:"flex",alignItems:"center",marginTop:"-5px"}}>
                <img className='notificationprofile' src={image2}/>
                <p style={{textAlign : "start",width:"160px"}}>Rohit likes your post</p>
                <img className="likeimage" src={image2}/>
            </div>
        </div>
        <div className='explorecontainer'>
           <div className='notificationtext'> 
              <p style={{fontSize:"20px",marginLeft:"-16px" ,marginTop:"12px",fontWeight:"bold"}}>Explore</p>
              <p style={{color:"grey",marginLeft:"25px"}}>See All</p>
            </div>
            <div className='exploreimage'>
                {post.map((item)=>(
                (item.image === '' ?  '' :
                     <img src={`${item.image}`} className='exploreimg'/>
                )
                    
                ))}
               
            </div>
            
        </div>
    </div>
  )
}

export default Leftbar