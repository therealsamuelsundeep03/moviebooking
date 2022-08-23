import React, { useState,useContext,useEffect } from 'react';
import { useLocation,useParams,useNavigate } from "react-router-dom";

import axios from "../../service/backendUrl";
import ThemeContext from "../../context/theme";
import "../../css/hall.css";

const Hall = () => {
  const [selectedSeats,setSelectedSeats] = useState([]);
  const [occupied,setOccupied] = useState([]);
  const [err,setErr] = useState("");

  // get theme
  const { theme } = useContext(ThemeContext);


  const {state:{time,showDay,hall,lang,id}} = useLocation();
  const seats = hall.seats;
  const price = hall.price;

  // console.log(id)

  const {movie} = useParams();

  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async() => {
      try{
        const { data} = await axios.get(`/booked/${movie}/${hall.hallname}/${hall.location}/${time}/${showDay}/${lang}`);
        setOccupied(data);
      }
      catch(err){
        setErr("Please check your internet connectivity");
      }
    }

    fetchData();

  },[])

  const seatsArr = [];
  let seatNo = 0;

  for(let i = 0;i < Math.ceil(seats/10);i++){
    let rows = [];

    for(let j = i*10;j < (i+1)*10;j++){
      // if seat num and seats are same then break or continue adding the seats
      if(seats == seatNo){   
        break;
      }else{
        seatNo += 1;
        rows.push({seatNo});
      }
    }

    seatsArr.push(rows)
  }


  const handleSelectedSeat = (seatNo) => {
    let isTheSeatSelected = selectedSeats.includes(seatNo);
    const booked = occupied.includes(seatNo);

    // depending on whether the seat is selected or not the color will change accordingly
    if(isTheSeatSelected){
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNo));
    }
    else if(booked){
      return null
    }
    else{
      setSelectedSeats([...selectedSeats,seatNo]);
    }
  }

  const handleNavigation = () => {
    navigate("/summary",{state : {selectedSeats,hall,price,showDay,movie,time,lang}})
  }
  return (
    <>
      {err ? 
        <div className='landingErr'>
            <div>Some problem occured</div>
            <div>{err} or Try after some time.</div>
        </div> : (
          <>
            <div className={`movieHall ${theme ? "darkMovieHall" : ""}`}>

            {/* hall header */}
            <div className={`hallHeader ${theme ? "darkHallHeader" : ""}`}>
              <div className='showDet'>
                  <h4 className={`${theme ? "darkHallHeading" : ""}`}>{movie.toLocaleUpperCase()}</h4>
                  <div className={`showTimings ${theme ? "darkHallDetails" : ""}`}>{hall.hallname} : {hall.location} | {time} {showDay}</div>
              </div>
            </div>

            {/* seats container */}
            <div className={`container`}>
              {seatsArr.map((seats) => <div className='seatRow'>{seats.map((seat,idx) => 
                <div className={`seat ${(occupied.includes(seat.seatNo)) ? "red" : ""} ${(selectedSeats.includes(seat.seatNo)) ? "green" : ""}`}  key={seat.seatNo} value={seat.seatNo} onClick={() => {handleSelectedSeat(seat.seatNo)}}>
                  <span className={`material-symbols-outlined `} >weekend</span>
                </div>
              )}
              </div>)}

              {/* screen */}
              <div className='screen'></div>
            </div>

            {/* price Info */}
            {/* displayed only when atleast one seat is selected */}
            {selectedSeats.length > 0 && (
              <div className={`priceInfo ${theme ? "darkpriceInfo" : ""}`}>
                <button className='payBtn' onClick={handleNavigation}>Pay Rs.{selectedSeats.length*150}</button>
              </div>
            )}
            </div>
          </>
        )}
    </>
  )
}

export default Hall;