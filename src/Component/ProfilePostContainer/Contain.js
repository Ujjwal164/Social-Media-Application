import React, { useEffect, useState } from 'react';

import "./Contain.css";
import axios from 'axios';

import more from "../Images/more.png";
import like from "../Images/like.png";
import coments from "../Images/comment.png";
import share from "../Images/share.png";
import liking from "../Images/setlike.png";  // Add this line
import { useSelector } from 'react-redux';

function Contain({details}) {
 
  const[user , setuser]  = useState([]);
  useEffect(() => {
     const getuser  =async()=>{
      try {
        const res = await axios.get(`http://localhost:7000/api/user/post/user/details/${details.user}`)
      setuser(res.data);
      } catch (error) {
        console.log("some error occured")
      }
     }
     getuser();
  }, [])

  return (
    <div>
      <div className='postbox'>
        <div style={{ display: "flex", alignItems: "center", paddingTop: "12px", marginLeft: "15px" }}>
          <img className="profileimage" src={`${user.profile}`} />
          <p style={{ fontSize: "17px", marginLeft: "9px" }}>{user.username}</p>
          <img className='moreicon' src={more} />
        </div>
        <p style={{ width: "90%", marginLeft: "19px" }}>{details.title}</p>
        <img style={{ height: "39vh", width: "70vh", objectFit: "contain", marginLeft: "60px", marginTop: "12px" }} src={`${details.image}`} />
        <div style={{ display: "flex", alignItems: "center", marginLeft: "18px", marginTop: "14px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img className='likecom'  src={`${like}`} />
            <p style={{ marginLeft: "1px" }}>Like</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
            <img className='likecom' src={coments} />
            <p style={{ marginLeft: "4px" }}>Comments</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginLeft: "48vh" }}>
            <img className='likecom' src={share} />
            <p style={{ marginLeft: "3px" }}>Share</p>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",marginLeft:"17px",marginTop:"12px"}}>
             <img src={user.profile} style={{height: "40px", width: "40px", borderRadius: "50%", objectFit: "cover"}} />

            <input style={{marginLeft:"9px",height:"35px",border:"none"}} type='text' placeholder='write your comment'/>
            <button style={{padding:"10px 10px",marginLeft:"43vh",backgroundColor:"black",color:"white",borderRadius:"5px"}}>Add Comment</button>
        </div>
      </div>
    </div>
  );
}

export default Contain
