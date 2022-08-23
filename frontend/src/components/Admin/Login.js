import React,{ useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope,faLock,faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import FormInputs from '../FormInputs';
import axios from "../../service/backendUrl";
import useAuth from '../../hooks/useAuth';

const Login = ({setSignIn}) => {
    const [credentials,setCredentials] = useState({
        email:"",
        password:"",
        errors:{
            email:"",
            password:"",
        },
        touched:{
            email:false,
            password:false,
        }
    });

    const [passwordType,setPaswordType] = useState("password");


    const [error,setError] = useState("");

    const navigate = useNavigate();

    const handlePassword = () => {
        if(passwordType === "password"){
            setPaswordType("text");
        }else{
            setPaswordType("password");
        }
     }

     const { setAuth }  = useAuth();

    const loginInp = [
        {type:"email",placeholder:"Email",name:"email",value:credentials.email,err:credentials.errors.email,icon:{...faEnvelope}},
        {type:passwordType,placeholder:"Password",name:"password",value:credentials.password,err:credentials.errors.password,icon:{...faLock}}
    ]

    // set validations and handle input
    const handleChange = ({target:{name,value}}) => {
        const errors = credentials.errors;

        switch(name){
            case "email" : 
                errors.email = !value ? "Enter A Valid Email Address" : "";
                break;

            case "password" : 
                errors.password = !value ? "Enter A Vaild Password" : "";
                break;

            default : break;
        }

        setCredentials({...credentials,[name]:value},errors)
    }

    // checks if the user had been to the input feild
    const handleBlur = ({target:{name}}) => {
        const touched = {...credentials.touched,[name]:true};
        setCredentials({...credentials,touched});
    }   

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const errors = credentials.errors;
            // disable submit button until all the inputs are validated
            const error = Object.values(credentials.errors).filter(err => err !== "").length;
            const notTouched = Object.values(credentials.touched).filter(err => !err).length;

            // if no errors then send the data to the backend...
            if(!error.length && !notTouched.length){

                // if the credentials is validated then send the response to the backend
                const { data } = await axios.post("/login",
                {email:credentials.email,password:credentials.password},
                {withCredentials:true});
                setAuth(data.accessToken);
                localStorage.setItem("id",data.id);
                // console.log(data.id);
                navigate("/hallInfo")
            }else{
                errors.username="Fill All Inputs";
                console.log("error")
                setCredentials({...credentials,errors})
            }
        }
        catch(err){
            // if no response from then send an error on network connectivity
            if(!err.response){
                setError("Check Internet Connectivity");
            }
            else if(err.response.data === "Email Doesn't Exists"){

                // error if all the inputs are not filled
                setError("Email Doesn't Exists");
            }
            else if(err.response.data === "Password Is Incorrect"){

                // error if all the inputs are not filled
                setError("Password Is Incorrect");
            }
            else if(err.response.data === "Fill all inputs"){

                // error if all the inputs are not filled
                setError("Fill all inputs");
            }
            else{

                // to catch any unkown error
                setError("Sign In Failed")
            }
        }
    } 


    // console.log(credentials.errors,credentials.touched)
    return (
        <>
            <form className='loginForm' onSubmit={handleSubmit}>

              {error && 
                <div className='formErrors'>
                    <FontAwesomeIcon icon={faCircleExclamation} style={{marginRight:'10px'}}/>
                    {error}
                </div>
              }

                <h2 className='title'>Login</h2>

                {loginInp.map((inp) => <FormInputs type={inp.type} placeholder={inp.placeholder} name={inp.name} value={inp.value} handleChange={handleChange} handleBlur={handleBlur} err={inp.err} icon={inp.icon} handlePassword={handlePassword}/>)} 

                <div className='forgotPassword' onClick={() => {navigate("/identity")}}>Forgot Password?</div>                
                <button type='submit' className='btn'>Log In</button>

                <div className='hr'/>

                <div className='loginsigninLink'>New Here? <span onClick={() => {setSignIn(true)}}> Sign In</span></div>
                <div className='socialMedia'></div>
            </form>
        </>
    )
}

export default Login