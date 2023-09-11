
import './App.css';
import Home from "./Pages/Home/Home.js"
import Profile from "./Pages/Profile/Profile"
import Register from "./Pages/Register/Register"
import Login from './Pages/Login/Login';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useSelector } from 'react-redux';
import Resetpassword from './Component/Resetpassword/Reset';
import Forgotpassword from './Component/Forgetpassword/Forget';
import VerifyEmail from "./Component/Verifyemail/Verify"
function App() {
  const userDetails = useSelector((state)=>state.user);
  let user  = userDetails.user
  console.log(user);
  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route path='' element={<Home/>}></Route>
        <Route path='/Profile/:id' element={<Profile/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={  <Login/>}></Route>
        <Route path='/reset/password' element={<Resetpassword/>} ></Route>
        <Route path='forget/password' element={<Forgotpassword/>}></Route>
        <Route path='verify/email' element={<VerifyEmail/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
