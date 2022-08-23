import React,{useEffect,useState} from 'react';
import axios from "axios";

import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const Hero = () => {
    const [user,setUser] = useState([]);
    const refresh = useRefreshToken();

    const { auth } = useAuth();
    console.log(auth);

    useEffect(() => {
        try{
            const controller = new AbortController(); //to cancel our requets if the component unmounts

            const fetchData = async () => {
                const { data } = await axios.get("http://localhost:8000/halls",{
                    signal : controller.signal
                });
                console.log(data)
            }
            // fetchData();
    
            return() => {
                controller.abort();
            }
        }
        catch(err){
            console.log("Error in getting the user::", err);
        }
    },[])
    return (
        <button onClick={() => refresh()}>refresh </button>
    )
}

export default Hero