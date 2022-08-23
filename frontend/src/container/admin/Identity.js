import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import FormInputs from "../../components/FormInputs";
import "../../css/identity.css";
import axios from "../../service/backendUrl";

function Identity () {
    let [identityEmail,setEmail] = useState("");
    let [error,setError] = useState("");
    const [loading,setLoading] = useState(false);

    const handleChange = ({target:{name,value}}) => {
        if(!value){
            setLoading(false)
            setError("Please Enter Valid Email Address");
        }else{
            setError("")
        }
        setEmail(value);
    }

    const identityInp = [
        {type:"email",placeholder:"Email",name:"identityEmail",value:identityEmail,err:error,icon:{...faEnvelope}}
    ]
    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        try{
            if(!error.length && identityEmail.length){
                const {data} = await axios.post("/forgotpassword",{identityEmail});
                console.log(data);
                if(data === "no user with this id"){
                    setLoading(false)
                    setError("Email doesn't exists");
                }else if(data === "check in email"){
                    localStorage.setItem('email',identityEmail);
                    alert("please check in email under the name Hebe to reset the password");
                    window.open("about:blank", "_self");
                    window.close();
                }else{
                    setError("some error occurred in confirming the email")
                }
            }
            else{
                setLoading(false)
                setError("Please Enter Valid Email Address");
            }
        }
        catch(err){
            console.log("Error in confirming the email::", err);
        }
    }

    console.log(loading);
    console.log(error)
    return (
        <>
            <div className="identityContainer">
                <div className='identityPassContent'>
                    <h3>Forgot Your Password!</h3>
                    <h3>Dont Worry We Got Your Back.</h3>
                </div>
                <div className="identity">
                    <h3>Find Your Account</h3>
                    <div>Please enter your email address to search for your account.</div>
                    
                        {/* identity form */}
                        <form className="identityform " onSubmit={handleSubmit}>
                            {identityInp.map((inp) => <FormInputs type={inp.type} placeholder={inp.placeholder} name={inp.name} value={inp.value} handleChange={handleChange} err={inp.err} icon={inp.icon}/>)}
                            <button type="submit" className="identityBtn btn">Submit</button>
                        </form>
                </div>
            </div>
        </>
    )
}


export default Identity;


// <FontAwesomeIcon className='forgoticon' icon={faEnvelope}/>
//                             <input 
//                             type="email"
//                             placeholder="Email"
//                             onChange={handleChange}/>
//                             <span className="identityError">{error}</span>