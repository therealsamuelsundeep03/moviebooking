import React, { useState } from 'react';

import Login from "../../components/Admin/Login";
import Signin from '../../components/Admin/Signin';
import "../../css/signin.css";

const AdminForm = () => {
  const [signIn,setSignIn] = useState(false);

  return (
    <>
      <div className={`adminFormContainer ${signIn ? "setSignIn" : ""}`}>
        <div className='fromsContainer'>
          <div className='loginSignin'>

            {/* login form */}
            <Login setSignIn={setSignIn}/>

            {/* signin form */}
            <Signin setSignIn={setSignIn}/>
          </div>
        </div>

        <div className='panelsContainer'>
          <div className='panel leftPanel'>
            <div className='content'>
              <h3>Hello,</h3>
              <h4>Welcome Back To Book My Movie .</h4>
            </div>
            {/* img */}
          </div>
          <div className='panel rightPanel'>
            <div className='content'>
              <h3>Book My Show</h3>
              <h4>A Movie Booking Experience</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminForm