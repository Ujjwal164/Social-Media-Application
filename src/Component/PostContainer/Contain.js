import React, { useEffect, useState } from 'react';
import "./Contain.css";
import axios from 'axios';
import profileimg from "../Images/image5.jpg";
import status from "../Images/image3.jpg";
import more from "../Images/more.png";
import like from "../Images/like.png";
import coments from "../Images/comment.png";
import share from "../Images/share.png";
import liking from "../Images/setlike.png";  // Add this line
import { useSelector } from 'react-redux';

function Contain({post}) {
  const userDetails = useSelector((state)=>state.user);
  let users  =userDetails.user
  console.log(users);
  let id = users?.other?._id;

  const[user , setuser]  = useState([]);
  useEffect(() => {
     const getuser  =async()=>{
      try {
        const res = await axios.get(`http://localhost:7000/api/user/post/user/details/${post.user}`)
      setuser(res.data);
      } catch (error) {
        console.log("some error occured")
      }
     }
     getuser();
  }, [])

const userId = users.other._id;
const accessToken=users.accessToken;

  const [Likes, setLikes] = useState([post.like.includes(userId) ? liking : like]);
  const [Count, setCount] = useState(post.like.length);
  const [Comments , setComments] = useState(post.comments);
  const [commentwriting , setcommentwriting] = useState('');
  
  
  const handleOnChange = async () => {
    if (Likes === like) {
      await fetch(`http://localhost:1000/api/post/${post._id}/like` , {method:"PUT", headers:{'content-Type':"application/Json" , token:accessToken}})
      setLikes(liking);
      setCount(Count + 1);
    } else {
      await fetch(`http://localhost:1000/api/post/${post._id}/like` , {method:"PUT", headers:{'content-Type':"application/Json" , token:accessToken}})
      setLikes(like);
      setCount(Count - 1);
    }
  }
console.log(user);

const addComment = async () =>{
  const comment = {
    "postid" :`${post._id}`,
    "username" : `${users.other.username}`,
    "comment" : `${commentwriting}`
  }
  await fetch(`http://localhost:1000/api/post/${post._id}/like` , {method:"PUT", headers:{'content-Type':"application/Json" , token:accessToken},body:JSON.stringify(comment)})

  setComments(Comments .concat(comment));
}

const handleComment = () =>{
  addComment();
}

console.log(Comments);
  return (
    <div>
      <div className='postbox'>
        <div style={{ display: "flex", alignItems: "center", paddingTop: "12px", marginLeft: "15px" }}>
          <img className="profileimage" src={user.profile} />
          <p style={{ fontSize: "17px", marginLeft: "9px" }}>{user.username}</p>
          <img className='moreicon' src={more} />
        </div>
        <p style={{ width: "90%", marginLeft: "19px" }}>{post.title}</p>
        {post.image !== ' '?
        <img style={{ height: "39vh", width: "70vh", objectFit: "cover", marginLeft: "60px", marginTop: "12px" }} src={`${post.image}`}/> : post.video !==''? <video style={{ height: "39vh", width: "70vh", objectFit: "cover", marginLeft: "60px", marginTop: "12px" }} width="750" height="500" controls >
          <source src={`${post.video}`} type="video/mp4"/>
          </video> :''
        }
        <div style={{ display: "flex", alignItems: "center", marginLeft: "18px", marginTop: "14px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img className='likecom' onClick={handleOnChange} src={Likes} />
            <p style={{ marginLeft: "1px" }}>{Count} Like</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
            <img className='likecom' src={coments} />
            <p style={{ marginLeft: "4px" }}>{Comments.length}Comments</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginLeft: "48vh" }}>
            <img className='likecom' src={share} />
            <p style={{ marginLeft: "3px" }}>Share</p>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",marginLeft:"17px",marginTop:"12px"}}>
            <img src={user.profile} style={{height:"40px",width:"40px",borderRadius:"50%",objectFit:"cover"}}/>
            <input style={{marginLeft:"9px",height:"35px",border:"none"}} type='text' placeholder='write your comment'/>
            <button style={{padding:"10px 10px",marginLeft:"43vh",backgroundColor:"black",color:"white",borderRadius:"5px"}}>Add Comment</button>
        </div>
      </div>
    </div>
  );
}

export default Contain
