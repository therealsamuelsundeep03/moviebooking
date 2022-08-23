import React,{ useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Admin/Header';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import "../../css/adminHalls.css"

const AdminHalls = () => {
    const [hallDetails,setHallDetails] = useState([]);
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
            const { data } = await axiosPrivate.get(`/halls/hall/${id}`);
            !data.length ? setEmpty("No Halls Added") : setHallDetails(data);
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
                </> : hallDetails ? (
                <>
                    <Header />
                    <div className='adminHallDetails adminHallDetailsHall'>                 
                        {hallDetails.map(hallDet => {
                            return (
                                <>
                                    <div>
                                        <div>Hall Name : {hallDet.hallname}</div>
                                        <div>Hall Location : {hallDet.location}</div>
                                        <div>Movie Name : {hallDet.moviename}</div>
                                    </div>
                                </>
                            )
                        })}
                    </div>                  
                </>
            ) : (<div>Loading...</div>) : navigate("/login")}
        </>
    )
}

export default AdminHalls;

