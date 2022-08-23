import React, {  useState,useEffect }  from 'react';
import { useNavigate } from "react-router-dom";

import "../../css/adminHeader.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Header = () => {
  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();

  const signOut = async() => {
    try{
      localStorage.removeItem("id");
      window.location.href = "/login";

      // to remove the use from the logged in db.
      const { data } = await axiosPrivate.get("/logout");
    }
    catch(err){
      if(err){
        localStorage.removeItem("id");
        window.location.href = "/login";
      }
    }
  }

  return (
    <header className='adminheader' style={{backgroundColor:"#e40046"}}>
        <h3 style={{color:"#fff"}}>Book My Movie</h3>
        <div className='headerList'>
          <div onClick={() => {navigate("/hallInfo")}}>Add Movie</div>
          <div onClick={() => {navigate("/hall-details")}}>Halls</div>
          <div onClick={() => {navigate("/booked-customers")}}>Booked</div>
         <div onClick={signOut}>Sign Out</div>
        </div>
     </header>
  )
}

export default Header;
