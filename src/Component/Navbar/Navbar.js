import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../ReduxContainer/userReducer';

function Navbar() {
  const userDetails = useSelector((state) => state.user);
  const user = userDetails.user;
  const id = user?.other?._id;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className='Maincontainer'>
      <div className='leftsidecontainer'>
        <Link to='/'>
          <p>Social</p>
        </Link>
      </div>
      <div className='midsidecontainer'>
        <i className='fa-solid fa-magnifying-glass searchicon'></i>
        <input className='searchbox' type='text' placeholder='search your friends' />
      </div>
      <div className='rightsidecontainer'>
        <i className='fa-regular fa-bell icons'></i>
        <i className='fa-regular fa-message icons'></i>

        <img className='profileicon' src={`${user.other.profile}`} alt='Profile' />
        <Link to={`/Profile/${id}`}>
          <p className='profilename'>{user?.other?.username}</p>
        </Link>
        <p style={{ marginLeft: '10px', fontSize: '17px', cursor: 'pointer' }} onClick={handleLogout}>
          Logout
        </p>
      </div>
    </div>
  );
}

export default Navbar;
