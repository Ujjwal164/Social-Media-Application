import React from 'react'
import "./Leftbar.css"
import image1 from "../Images/image1.jpg"
import image2 from "../Images/image2.jpg"
import image3 from "../Images/image3.jpg"
import image4 from "../Images/image4.jpg"
import image5 from "../Images/image5.jpg"
import { useSelector } from 'react-redux'
function Leftbar() {
    const userDetails = useSelector((state)=>state.user);
  let user  =userDetails.user
  console.log(user);
  return (
    <div>
        <div className='notification'> 
            <img className="coverimg" src={`${image1}`}/>
            <div style={{display:"flex",marginLeft:"8px",marginTop:"-33px"}}>
                <img style={{height:"69px",width:"69px",borderRadius:"50%",marginTop:"5px"}} src={`${image5}`}/>
                <div style={{marginLeft:"6px",marginTop:"11px"}}>
                    <p style={{fontSize:"18px"}}>Anamika</p>
                    <p style={{fontSize:"13px",marginTop:"-19px"}}>Software Develper</p>
                </div>
             
            </div>
            <div style={{display:"flex",justifyContent:"space-between", marginLeft:"12px"}}>
                <p>Following</p>
                <p style={{marginRight:"16px"}}>1234</p>
            </div>
            <div style={{display:"flex",justifyContent:"space-between", marginLeft:"12px",marginTop:"-16px"}}>
                <p>Followers</p>
                <p style={{marginRight:"16px"}}>800</p>
            </div>
            <div style={{marginTop:"-29px"}}>
                <h5 style={{fontSize:"18px",textAlign:"center"}}> User Bio</h5>
                <p style={{fontSize:"13px",marginTop:"-21px",marginLeft:"15px"}}>Beleive you can and you are half away there</p>
            </div>
            <button style={{paddingTop:"4px",paddingBottom:"4px",width:"50%",fontSize:"14px",marginLeft:"65px",marginTop:"12px"}}>Edit</button>
        </div>
        <div className='explorecontainer'>
          <h2 style={{textAlign:"center",marginTop:"7px"}}>Your Friends</h2>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"-24px"}}>
            <p style={{fontSize:"20px",marginLeft:"18px"}}>Friend</p>
            <p style={{color:"grey",marginRight:"13px",cursor:"pointer"}}>See All</p>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",marginLeft:"10px"}}>
            <div >
                <img style={{height:"80px",width:"80px",objectFit:"cover",marginLeft:"7px",borderRadius:"4px"}} src={`${image1}`}/>
                <p style={{textAlign:"center",marginTop:"-3px"}}>Ujjwal</p>
            </div>
            <div >
                <img style={{height:"80px",width:"80px",objectFit:"cover" ,marginLeft:"7px" ,borderRadius:"4px"}} src={`${image2}`}/>
                <p style={{textAlign:"center",marginTop:"-3px"}}>Anuj</p>
            </div>
            <div >
                <img style={{height:"80px",width:"80px",objectFit:"cover" ,marginLeft:"7px" ,borderRadius:"4px"}} src={`${image3}`}/>
                <p style={{textAlign:"center",marginTop:"-3px"}}>Rajat</p>
            </div>
            <div >
                <img style={{height:"80px",width:"80px",objectFit:"cover" ,marginLeft:"7px" ,borderRadius:"4px"}} src={`${image4}`}/>
                <p style={{textAlign:"center",marginTop:"-3px"}}>Rahul</p>
            </div>
            <div >
                <img style={{height:"80px",width:"80px",objectFit:"cover" ,marginLeft:"7px" ,borderRadius:"4px"}} src={`${image5}`}/>
                <p style={{textAlign:"center",marginTop:"-3px"}}>Rohan</p>
            </div>
            <div >
                <img style={{height:"80px",width:"80px",objectFit:"cover" ,marginLeft:"7px" ,borderRadius:"4px"}} src={`${image4}`}/>
                <p style={{textAlign:"center",marginTop:"-3px"}}>Ayushi</p>
            </div>
            <div >
                <img style={{height:"80px",width:"80px",objectFit:"cover" ,marginLeft:"7px" ,borderRadius:"4px"}} src={`${image2}`}/>
                <p style={{textAlign:"center",marginTop:"-3px"}}>Lavanya</p>
            </div>
            <div >
                <img style={{height:"80px",width:"80px",objectFit:"cover" ,marginLeft:"7px" ,borderRadius:"4px"}} src={`${image1}`}/>
                <p style={{textAlign:"center",marginTop:"-3px"}}>Raman</p>
            </div>
            <div >
                <img style={{height:"80px",width:"80px",objectFit:"cover" ,marginLeft:"7px" ,borderRadius:"4px"}} src={`${image3}`}/>
                <p style={{textAlign:"center",marginTop:"-3px"}}>Raju</p>
            </div>
          </div>
            
        </div>
    </div>
  )
}

export default Leftbar