import React,{ useState } from 'react';
import { faLock } from "@fortawesome/free-solid-svg-icons";

import FormInputs from '../../components/FormInputs';
import axios from "../../service/backendUrl";
import "../../css/resetpass.css"

const ResetPassword = () => {
    const [credentials,setCredentials] = useState({
        password:"",
        confirmpassword:"",
        errors:{
            password:"",
            confirmpassword:""
        },
        touched:{
            password:false,
            confirmpassword:false
        }
    });

    const [passwordType,setPaswordType] = useState("password");

    const [error,setError] = useState("");

    const [loading,setLoading] = useState(false);

    
    const resetInp = [
        {type:passwordType,placeholder:"Password",name:"password",value:credentials.password,err:credentials.errors.password,icon:{...faLock},id:"pass"},
        {type:passwordType,placeholder:"Confirm Password",name:"confirmpassword",value:credentials.confirmpassword,err:credentials.errors.confirmpassword,icon:{...faLock}}
    ]

    const handlePassword = () => {
        if(passwordType === "password"){
            setPaswordType("text");
        }else{
            setPaswordType("password");
        }
     }

     const handleBlur = ({target:{name}}) => {
        const touched = {...credentials.touched,[name]:true};
        setCredentials({...credentials,touched});
    }  

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%()^&*_]).{8,24}$/;

    // set validations and handle input
    const handleChange = ({target:{name,value}}) => {
        const errors = credentials.errors;

        switch(name){
            case "password" :
                const result = passwordRegex.test(credentials.password);
                errors.password = !result ? "Must include 8 to 24 characters,uppercase,lowercase and a special character(!@#$%^&*_)" : "";
                break;

            case "confirmpassword" : 
                if(value !== credentials.password){
                errors.confirmpassword = "Password Doesn't Match";
                }else{
                errors.confirmpassword = "";
                }

            default : break;
        }

        setCredentials({...credentials,[name]:value},errors)
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const errors = Object.values(credentials.errors).filter( err => err !== "");
            const notTouched = Object.values(credentials.touched).filter(err => !err);
            
            if(!credentials.confirmpassword.length){
                setLoading(false)
                const errors = credentials.errors;
                errors.confirmpassword = "Please fill this field";
                setCredentials({...credentials,errors})
            }else{
                // if there are no errors then send the form to the backend
                if(!errors.length && !notTouched.length){
                    const password = credentials.password;
                    const email = localStorage.getItem('email');
    
                    const { data } = await axios.put("/resetpassword",{
                        password,
                        email
                    });

                // if the password is reset then direct the user to the login page
                if(data === "password changed successfully"){
                    localStorage.removeItem('email')
                    window.location.href="/login";
                }
                else{
                    // display an error caused during the password reset
                    setLoading(false);
                    const errors = credentials.errors;
                    errors.password = "password changed successfully";
                    setCredentials({...credentials,errors})
                }
                }
    
            }    
        }
        catch(err){
            console.log("Error in reseting the password::", err);
        }
    }


    return (
    <>
       <div className='resetPassContainer'>
        <div className='resetPassContent'>
            <h3>Congrats!</h3>
            <h3>Your Email Has Been Verified</h3>
        </div>
        <div className='resetPassword'>
            <h3 className='resetTitle'>Reset Pasword</h3>
            <form className='resetPasswordForm' onSubmit={handleSubmit}>
                <div className='resetPassInp'>
                    {resetInp.map((inp) => <FormInputs type={inp.type} placeholder={inp.placeholder} name={inp.name} value={inp.value} handleChange={handleChange} handleBlur={handleBlur} err={inp.err} icon={inp.icon} handlePassword={handlePassword} id={inp.id}/>)} 
                </div>
                <div className='resetBtn'><button type='submit' className='btn reset'>Submit</button></div>
            </form>
        </div>
       </div>
    </>
    )
}

export default ResetPassword