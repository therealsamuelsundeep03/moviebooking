import React, { useState,useEffect } from 'react'

import axios from "../../service/backendUrl";


const PayButton = ({ticketDetails,email,setErr,err}) => {
    const [disable,setDisabled] = useState(false);

    useEffect(() => {
        if(err) setDisabled(true)
    },[err])

    const handleCheckout = async() => {
        try{   
            setDisabled(true);

            if(!email.length){
                setErr("Please Enter Valid Email Address");
            }

            // getting the theatre id
            const id = localStorage.getItem("id");

            
            const { data } = await axios.post("/stripe/create-checkout-session",{
                ...ticketDetails,"userId":email,id
            });

            // console.log(data);

           if(data.session)  window.location.href = data.session;
        }
        catch(err){
            if(err.response.status === 403) setErr("Please Enter Valid Email Address");
            if(err.response.status === 400) window.location.href="/";
            console.log("Error in Checking out::", err);
        }
    }
    return (
        <button onClick={() => {handleCheckout()}} >Checkout</button>
    )
}

export default PayButton