import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import app from '../../firebase';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { register } from '../../Component/ReduxContainer/callapi';

function Register() {
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  // Remove redundant user selector
  const user =useSelector((state)=>state.user);
  const [email, setemail] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [file, setfile] = useState(null);
  const userDetails = user.user;
  const navigator = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    if (file !== null) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
          console.error('Upload error:', error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            // Call the API to register user
            await register(dispatch, {
              email,
              password,
              username,
              phonenumber,
              profileImage: downloadURL, // Assuming you have a field for profile image
            });
            window.location.reload(true);
          } catch (error) {
            console.error('Error while registering:', error);
          }
        }
      );
    } else {
      // Call the API to register user without profile image
      register(dispatch, { email, password, username, phonenumber });
      window.location.reload(true);
    }
  };
  console.log(userDetails?.Status)
   if(userDetails.Status ==='pending'){
    navigator("/verify/email");
   }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: 'rgb(231, 229, 229)',
        height: '100vh',
        alignItems: 'center',
      }}
    >
      <div style={{ marginTop: '-200px', marginLeft: '-100px' }}>
        <p style={{ fontSize: '55px' }}>
          Soc<span className='halfcolor'>ial</span>
        </p>
        <p style={{ fontSize: '30px', marginTop: '-50px' }}>
          Connect With<span className='halfcolor'> Friends And Family</span>
        </p>
      </div>
      <div
        style={{ display: 'flex', flexDirection: 'column', marginLeft: '-32px' }}
      >
        <p style={{ fontSize: '34px', textAlign: 'start', marginBottom: '6px' }}>
          Create New Account
        </p>
        <input
          type='file'
          name='file'
          id='file'
          onChange={(e) => setfile(e.target.files[0])}
        />
        <input
          className='inputbox'
          type='text'
          onChange={(e) => setusername(e.target.value)}
          placeholder='Username'
        />
        <input
          className='inputbox'
          type='email'
          onChange={(e) => setemail(e.target.value)}
          placeholder='Email'
        />
        <input
          className='inputbox'
          type='password'
          onChange={(e) => setpassword(e.target.value)}
          placeholder='Password'
        />
        <input
          className='inputbox'
          type='number'
          onChange={(e) => setphonenumber(e.target.value)}
          placeholder='Phone Number'
        />
        <button
          style={{
            textAlign: 'center',
            padding: '10px 12px',
            fontSize: '18px',
            borderRadius: '25px',
            marginTop: '10px',
            fontWeight: 'bold',
          }}
          onClick={handleClick}
        >
          Sign Up
        </button>
        <p style={{ fontSize: '18px', marginTop: '15px', marginLeft: '18px' }}>
          Already have an account?
          <Link to='/login'>
            <span> Log In</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
