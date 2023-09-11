import React from 'react'
import "./Rightbar.css"
import image1 from "../Images/image1.jpg"
import image2 from "../Images/image2.jpg"
import image3 from "../Images/image3.jpg"
import image4 from "../Images/image4.jpg"
import image5 from "../Images/image5.jpg"
import friend from "../Images/addfriend.png"
function Rightbar() {
  return (
    <div className='rightcontainer'>
        <div className='topcontainer'>
              <div >
                    <h3 style={{textAlign:"center"}}>Followers</h3>
                    <div style={{display:"flex",marginLeft:"19px",marginBottom:"9px",alignItems:"center"}}>
                         <img style={{height:"85px",width:"85px",borderRadius:"5px",objectFit:"cover"}} src={`${image1}`}/>
                         <div style={{marginLeft:"9px"}}>
                              <p style={{fontSize:"20px",marginTop:"0px"}}>Ayushi</p>
                             
                         </div>
                    </div>
                    <div style={{display:"flex",marginLeft:"19px",marginBottom:"9px",alignItems:"center"}}>
                         <img style={{height:"85px",width:"85px",borderRadius:"5px",objectFit:"cover"}} src={`${image2}`}/>
                         <div style={{marginLeft:"9px"}}>
                              <p style={{fontSize:"20px",marginTop:"0px"}}>Ujjwal</p>
                             
                         </div>
                    </div>
                    <div style={{display:"flex",marginLeft:"19px",marginBottom:"9px",alignItems:"center"}}>
                         <img style={{height:"85px",width:"85px",borderRadius:"5px",objectFit:"cover"}} src={`${image3}`}/>
                         <div style={{marginLeft:"9px"}}>
                              <p style={{fontSize:"20px",marginTop:"0px"}}>Rohit</p>
                              
                         </div>
                    </div>
                    <div style={{display:"flex",marginLeft:"19px",marginBottom:"9px",alignItems:"center"}}>
                         <img style={{height:"85px",width:"85px",borderRadius:"5px",objectFit:"cover"}} src={`${image4}`}/>
                         <div style={{marginLeft:"9px"}}>
                              <p style={{fontSize:"20px",marginTop:"0px"}}>Raman</p>
                              
                         </div>
                    </div>
                    <div style={{display:"flex",marginLeft:"19px",marginBottom:"9px",alignItems:"center"}}>
                         <img style={{height:"85px",width:"85px",borderRadius:"5px",objectFit:"cover"}} src={`${image5}`}/>
                         <div style={{marginLeft:"9px"}}>
                              <p style={{fontSize:"20px",marginTop:"0px"}}>Anjali</p>
                            
                         </div>
                    </div>
                    <div style={{display:"flex",marginLeft:"19px",marginBottom:"9px",alignItems:"center"}}>
                         <img style={{height:"85px",width:"85px",borderRadius:"5px",objectFit:"cover"}} src={`${image2}`}/>
                         <div style={{marginLeft:"9px"}}>
                              <p style={{fontSize:"20px",marginTop:"0px"}}>Aman</p>
                              
                         </div>
                    </div>
                    <div style={{display:"flex",marginLeft:"19px",marginBottom:"9px",alignItems:"center"}}>
                         <img style={{height:"85px",width:"85px",borderRadius:"5px",objectFit:"cover"}} src={`${image1}`}/>
                         <div style={{marginLeft:"9px"}}>
                              <p style={{fontSize:"20px",marginTop:"0px"}}>Rahul</p>
                             
                         </div>
                    </div>
                    
               </div>   
                  
          </div>













          <div className='bottomcontainer'>
             <h3 style={{marginLeft:"20px",marginBottom:"4px",textAlign:"center"}}>Suggested For You</h3>
            <div className='profile'>
                 <img className="profileimg" src={`${image3}`}/>
                 <div style={{marginLeft:"10px",width:"185px"}}>
                    <p style={{fontSize:"19px",marginBottom:"-11px"}}>Ujjwal</p>
                    <p style={{color:"grey",marginTop:"10px",fontSize:"15px"}}>Suggested For You</p>
                 </div>
                 <img  className="friendicon" src={`${friend}`}/>
            </div>
            <div className='profile'>
                 <img className="profileimg" src={`${image1}`}/>
                 <div style={{marginLeft:"10px",width:"185px"}}>
                    <p style={{fontSize:"19px",marginBottom:"-11px"}}>Ayushi</p>
                    <p style={{color:"grey",marginTop:"10px",fontSize:"15px"}}>Suggested For You</p>
                 </div>
                 <img  className="friendicon" src={`${friend}`}/>
            </div>
            <div className='profile'>
                 <img className="profileimg" src={`${image4}`}/>
                 <div style={{marginLeft:"10px",width:"185px"}}>
                    <p style={{fontSize:"19px",marginBottom:"-11px"}}>Rohit</p>
                    <p style={{color:"grey",marginTop:"10px",fontSize:"15px"}}>Suggested For You</p>
                 </div>
                 <img  className="friendicon" src={`${friend}`}/>
            </div>
            <div className='profile'>
                 <img className="profileimg" src={`${image5}`}/>
                 <div style={{marginLeft:"10px",width:"185px"}}>
                    <p style={{fontSize:"19px",marginBottom:"-11px"}}>Anamika</p>
                    <p style={{color:"grey",marginTop:"10px",fontSize:"15px"}}>Suggested For You</p>
                 </div>
                 <img  className="friendicon" src={`${friend}`}/>
            </div>
            <div className='profile'>
                 <img className="profileimg" src={`${image1}`}/>
                 <div style={{marginLeft:"10px",width:"185px"}}>
                    <p style={{fontSize:"19px",marginBottom:"-11px"}}>Ujjwal</p>
                    <p style={{color:"grey",marginTop:"10px",fontSize:"15px"}}>Suggested For You</p>
                 </div>
                 <img  className="friendicon" src={`${friend}`}/>
            </div>
            <div className='profile'>
                 <img className="profileimg" src={`${image3}`}/>
                 <div style={{marginLeft:"10px",width:"185px"}}>
                    <p style={{fontSize:"19px",marginBottom:"-11px"}}>Rohan</p>
                    <p style={{color:"grey",marginTop:"10px",fontSize:"15px"}}>Suggested For You</p>
                 </div>
                 <img  className="friendicon" src={`${friend}`}/>
            </div>
        </div>
    </div>
  )
}

export default Rightbar