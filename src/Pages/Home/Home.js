import React from 'react'
import Navbar from '../../Component/Navbar/Navbar'
import "./Home.css"
import Leftbar from '../../Component/Leftbarcontainer/Leftbar'
import Mainpost from '../../Component/Mainpostcontainer/Mainpost'
import Rightbar from '../../Component/Rightbarcontainer/Rightbar'
import { useSelector } from 'react-redux'
function Home() {
  const userDetails = useSelector((state)=>state.user);
  let user  =userDetails.user
  console.log(user);
  return (
    <div className='main'>
        <Navbar/>
        <div className='mainpagecontainer'>
            <Leftbar/>
            <Mainpost/>
            <Rightbar/>
        </div>
    </div>
  )
}

export default Home