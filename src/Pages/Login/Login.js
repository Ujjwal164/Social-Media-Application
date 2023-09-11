import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {login} from '../../Component/ReduxContainer/callapi'
import { useSelector, useDispatch } from 'react-redux'


function Login() {
    const dispatch = useDispatch();
    const { isFetching , error } = useSelector((state)=>state.user);
    const [email , setemail] = useState('');
    const [password , setPassword] = useState('');
    const handleClick = (e)=>{
        e.preventDefault();
        login(dispatch, {email , password})
    }
  return (
    <div style={{display:"flex",justifyContent:"space-around",backgroundColor: "rgb(231, 229, 229)",height:"100vh"}}>
        <div style={{marginLeft:"-100px",marginTop:"300px"}}>
            <p style={{fontSize:"55px"}}>Soc<span className='halfcolor'>ial</span></p>
            <p style={{fontSize:"30px",marginTop:"-50px"}}>Connect With<span className='halfcolor'> Friends And Family</span></p>
        </div>
        <div style={{display:"flex",flexDirection:"column",marginLeft:"-32px",marginTop:"300px"}}>
            <p style={{fontSize:"34px",textAlign:"start",marginBottom:"6px"}}>Login in your Account</p>
            <input className="inputbox" id="email" type='text' onChange={(e)=>setemail(e.target.value)} placeholder='Username'/>
            <input  className="inputbox" id='password' type="password" onChange={(e)=>setPassword(e.target.value)}  placeholder='Password'/>
            <button style={{textAlign:"center",padding:"10px 12px",fontSize:"18px",borderRadius:"25px",marginTop:"10px",fontWeight:"bold"} } onClick ={handleClick}>Log In</button>
            <div style={{fontSize:"20px",marginLeft:"12px"}}>
                <Link >
                   <p>Forget Password ?</p>
                </Link>
                <Link to="/register">
                    <p style={{marginTop:"-5px"}}>Create New Account</p>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Login