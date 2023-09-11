import React from 'react'
import "./contentmain.css"
import gallery from "../Images/gallery.png"
import video from "../Images/video.png"
import emoji from "../Images/emoji.png"
import app from '../../firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSelector } from 'react-redux'
import { useState } from 'react'
function Contentmain() {
  const userDetails = useSelector((state)=>state.user);
  let user  = userDetails.user
  console.log(user);
  let id = user?.other?._id;
  const [file , setFile ] = useState(null);
  const [file2 , setFile2 ] = useState(null);
  const[title , setTitle] = useState('');
  const [imagePre , setImagePre] = useState(null);
  const [VideoPre , setVideoPre] = useState(null);
  const accessToken = user.accessToken;

  console.log(file?.name)
  const handlePost=(e) =>{
    e.preventDefault();
    if(file!==null){

   
    const fileName = new Date().getTime() + file?.name;
    const storage = getStorage(app);
    const StorageRef = ref(storage , fileName);
    
    const uploadTask = uploadBytesResumable(StorageRef, file);

    uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
   }, 
   (error) => {

    }, 
    () => {
    
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      fetch(`http://localhost:7000/api/post/user/post` , {method:"POST" , headers:{'Content-Type':"application/JSON", token : accessToken} , body:JSON.stringify({title:title , image:downloadURL , image:''})}).then((data)=>{
      alert("your post has been successfully uploaded")
      window.location.reload(true)
    })
    });
    }
   ); } else if(file2!==null){
    const fileName = new Date().getTime() + file2?.name;
    const storage = getStorage(app);
    const StorageRef = ref(storage , fileName);
    
    const uploadTask = uploadBytesResumable(StorageRef, file2);

    uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
   }, 
   (error) => {

    }, 
    () => {
    
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      fetch(`http://localhost:7000/api/post/user/post` , {method:"POST" , headers:{'Content-Type':"application/JSON", token : accessToken} , body:JSON.stringify({title:title , video:downloadURL , video:''})}).then((data)=>{
        alert("your post has been successfully uploaded")
        window.location.reload(true)
      })
    });
    }
   );
   }else{
    fetch(`http://localhost:7000/api/post/user/post` , {method:"POST" , headers:{'Content-Type':"application/JSON", token : accessToken} , body:JSON.stringify({title:title , video:'' , image:''})}).then((data)=>{
      alert("your post has been successfully uploaded")
        window.location.reload(true)
      }) 
  }

  }
  
  return (
    <div>
        <div  className='contentbox'>
            <div style={{display:"flex",alignItems:"center",marginLeft:"20px",paddingTop:"10px"}}>
                <img className="profileimg" src={`${user.other.profile}`}/>
                <input className="inputcontent" type='text' placeholder='share your moments' onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div style={{ marginTop:"40px"}}>
              {imagePre !== null ? <img src={imagePre}  style={{width:"400px" , height:"400px" ,objectFit:"cover", marginLeft:"150px" , borderRadius:"4px"}} /> : VideoPre !== null ? <video style={{ height: "39vh", width: "70vh", objectFit: "cover", marginLeft: "60px", marginTop: "12px" }} width="750" height="500" controls >
                <source src={VideoPre} type="video/mp4"/>
                 </video> :''
              }
              <div style={{display:"flex" , alignItems:"center" ,marginTop:"25px"}}>
                    <div style={{marginLeft:"20px",display:"flex",alignItems:"center" , marginBottom:"20px"}}>
                          <label htmlFor='file'>
                              <img className='contentboximg' src={`${gallery}`}/>
                              <input type='file' name="file" id='file' style={{display:"none"}} onChange={(e)=>[setFile(e.target.files[0]) , setImagePre(URL.createObjectURL(e.target.files[0]))]}/>
                            </label> 
                            <label htmlFor='file2'>
                              <img className='contentboximg' src={`${video}`}/>
                              <input type='file' name="file" id='file2' style={{display:"none"}} onChange={(e)=>[setFile2(e.target.files[0]) ,  , setVideoPre(URL.createObjectURL(e.target.files[0]))]}/>
                            </label> 
                            <img className='contentboximg' src={`${emoji}`}/>
                    </div>
                    <button style={{marginLeft:"520px",marginTop:"-9px",cursor:"pointer",backgroundColor:"black",color:"white",padding:"10px 27px",borderRadius:"10px"  , marginBottom:"20px"}} onClick={handlePost}>Post</button>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Contentmain