import React,{ useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Admin/Header';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import "../../css/adminHalls.css"

const Booked = () => {
    const [bookedCustomers,setBookedCustomers] = useState([]);
    const [err,setErr] = useState("");
    const [loading,setLoading] = useState(false);
    const [empty,setEmpty] = useState("");

    const id = localStorage.getItem("id");

    const navigate = useNavigate();

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
       try{
        setLoading(true);
        const fetchData = async() => {
            const { data } = await axiosPrivate.get(`/booked/${id}`);
            // console.log(data)
            !data.length ? setEmpty("No Tickets Booked") : setBookedCustomers(data);
            setLoading(false);
        }

        fetchData();
       }
       catch(err){
        if(err.response.status === 403){
            setErr("PLease Login Again")
        }else{
            setErr("Please Check The Connectivity or Login Again")
        }
       }
    },[])

    return (
        <>
            {id ? empty ?
                <>
                    <Header />
                    <div className='adminHallDetails'>
                        <div className='nil'>{empty}</div>
                    </div>
                </> : 
                <>
                {bookedCustomers ? (
                    <>
                         <Header />
        
                        <div className='adminHallDetails'>
                            <span className='profit'>
                                Total Profit : {bookedCustomers.reduce((total,{price}) => {return(+(price) + total)},0)}
                            </span>

                            {bookedCustomers.map(hallDet => {
                            return (
                                <>
                                    <div className='bookedCustDetails'>
                                        <div>
                                            <div>Hall Name : {hallDet.hallname}</div>
                                            <div>Hall Location : {hallDet.location}</div>
                                            <div>Movie Name : {hallDet.movie}</div>
                                            <div>Language : {hallDet.selectLang}</div>
                                        </div>
                                        <div>
                                            <div>Time : {hallDet.time}</div>
                                            <div>Day : {hallDet.showDay}</div>
                                            <div>Seats : {hallDet.selectedSeats.toString()}</div>
                                            <div>Amount Paid : {hallDet.price}</div>
                                        </div>
                                    </div>
                                </>
                            )
                            })}     
                        </div>
                    </>
                ) : <div>Loading...</div>}
                </>
             : navigate("/login")} 
        </>
    )
}

export default Booked;

// {id ? empty ? 
//     <>
//         <Header />
//         <div className='adminHallDetails'>
//             <div className='nil'>{empty}</div>
//         </div>
//     </> : bookedCustomers ? (
//     <>
        // <Header />
        
        // <div className='adminHallDetails'>
        
        //     {bookedCustomers.map(hallDet => {
        //     return (
        //         <>
        //             <div className='bookedCustDetails'>
        //                 <div>
        //                     <div>Hall Name : {hallDet.hallname}</div>
        //                     <div>Hall Location : {hallDet.location}</div>
        //                     <div>Movie Name : {hallDet.movie}</div>
        //                     <div>Language : {hallDet.selectLang}</div>
        //                 </div>
        //                 <div>
        //                     <div>Time : {hallDet.time}</div>
        //                     <div>Day : {hallDet.showDay}</div>
        //                     <div>Seats : {hallDet.selectedSeats.toString()}</div>
        //                     <div>Amount Paid : {hallDet.price}</div>
        //                 </div>
        //             </div>
        //         </>
        //     )
        //     })}
            
        // </div>
       
//     </>
// ) : (<>
//     <div className='adminHallDetails'>
//         <div className='nil'>Loading...</div>
//     </div>
//     </>) : ""} 
//     {/* //navigate("/login") */}