import React from 'react'
import "./Profile.css"

import ProfileLeftbar from "../../Component/ProfileLeftbar/Leftbar"
import Profilemain from "../../Component/Profilemain/Profilemain"
import ProfileRightbar from "../../Component/ProfileRightbar/Rightbar"
import Navbar from '../../Component/Navbar/Navbar.js'
import { useSelector } from 'react-redux'
function Profile() {
  const userDetails = useSelector((state)=>state.user);
  let user  =userDetails.user
  console.log(user);
  return (
    <div className='profilepage'>
            <Navbar/>
            <div className='maincontent'>
                <ProfileLeftbar/>
                <Profilemain/>
                <ProfileRightbar/>
            </div>
    </div>
  )
}

export default Profile