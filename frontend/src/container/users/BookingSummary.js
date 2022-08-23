
import React, { useState,useContext } from 'react';
import  { useLocation } from "react-router-dom";

import "../../css/bookingsum.css";
import axios from "../../service/backendUrl";
import PayButton from '../../components/user/payButton';
import ThemeContext from "../../context/theme";


const BookingSummary = () => {
  const [email,setEmail] = useState("");
  const [err,setErr] = useState("");

  // getting theme
  const { theme } = useContext(ThemeContext);

  // getting booking summmary details
  const {state:{selectedSeats,hall:{hallname,location},price,showDay,movie,time,lang}} = useLocation();
  
  // if any of the info is missing then redirect the user
  if(!lang || !selectedSeats || !hallname || !location || !price || !showDay || !movie || !time) window.location.href = "/";

  const handleChange = ({target:{value}}) => {
    setEmail(value);

    if(!value){
      setErr("Enter A Valid Email Address");
    }
    else{
      setErr("");
    }
  }

  return (
    <>
     {/* booking summary details */}
    <div className = {` bookingSummaryContainer ${theme ? "darkbookingSummaryContainer" : ""}`}>
      <div className={`bookingSummary ${theme ? "darkbookingSummary" : ""}`}>
          <h3 className='bookingTitle'>BOOKING SUMMARY</h3>
          <div className='bookingInfo'>
              <div className='bookedMovie'>Movie: <span className={`bookingDet ${theme ? "darkBookingDet" : ""}`}>{movie}</span></div>
              <div className='bookedLang'>Language: <span className={`bookingDet ${theme ? "darkBookingDet" : ""}`}>{lang}</span></div>
              <div className='bookedLocation'>Location: <span className={`bookingDet ${theme ? "darkBookingDet" : ""}`}>{hallname} {location}</span></div>
              <div className='bookedTime'>Time: <span className={`bookingDet ${theme ? "darkBookingDet" : ""}`}>{time}</span></div>
              <div className='bookedDate'>Date: <span className={`bookingDet ${theme ? "darkBookingDet" : ""}`}>{showDay}</span></div>
              <div className='bookedSeats'>Booked Seats:
                <span className='bookingDet'>
                  {selectedSeats.map(seats => <span className={`bookingSeat ${theme ? "darkBookingDet" : ""}`}>{seats}</span>)} 
                </span>
              </div>
              <div className='bookedTime'>Price: <span className={`bookingDet ${theme ? "darkBookingDet" : ""}`}>Rs. {price}</span></div>
              <div>
                <label>Email: </label>
                <input 
                className={`bookingDet email  ${theme ? "darkemail" : ""}`}
                type={"email"}
                placeholder="Email"
                value={email}
                onChange={handleChange} 
                />
                <span className={`emailerr`}>{err}</span>
              </div>
              <div className='bookingBtn'>
                  <PayButton ticketDetails={{"Movie":movie,"Language":lang,"Location":location,hallname:hallname,"movieTickets":selectedSeats,"Time":time,"Day":showDay,"Price":price }} email={email} setErr={setErr} err={err}/>
              </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default BookingSummary