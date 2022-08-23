import React,{ useState,useEffect } from 'react';
import FormInputs from '../FormInputs';
import { faEnvelope,faLock,faUser,faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import axios from "../../service/backendUrl";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Signin = ({setSignIn}) => {
  const [credentials,setCredentials] = useState({
    username:"",  
    email:"",
      password:"",
      confirmpassword:"",
      errors:{
        username:"",  
        email:"",
          password:"",
          confirmpassword:""
      },
      touched:{
        username:false,  
        email:false,
          password:false,
          confirmpassword:false
      }
  })

  const [error,setError] = useState("");

  const [passwordType,setPaswordType] = useState("password");


  // signin inp
  const signinInp = [
    {type:"username",placeholder:"Username",name:"username",value:credentials.username,err:credentials.errors.username,icon:{...faUser}},
    {type:"email",placeholder:"Email",name:"email",value:credentials.email,err:credentials.errors.email,icon:{...faEnvelope}},
    {type:passwordType,placeholder:"Password",name:"password",value:credentials.password,err:credentials.errors.password,icon:{...faLock},id:"pass"},
    {type:"password",placeholder:"confirmpassword",name:"confirmpassword",value:credentials.confirmpassword,err:credentials.errors.confirmpassword,icon:{...faLock}}
  ]

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%()^&*_]).{8,24}$/;

  const handlePassword = () => {
    if(passwordType === "password"){
        setPaswordType("text");
    }else{
        setPaswordType("password");
    }
 }

  // set validations and handle input
  const handleChange = ({target:{name,value}}) => {
      const errors = credentials.errors;

      switch(name){
          case "username" : 
              errors.username = !value ? "Enter Username" : "";
              break;

          case "email" : 
              errors.email = !value ? "Enter A Valid Email Address" : "";
              break;

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
        const {username,email,password,confirmpassword} = credentials
        const response = await axios.post("/signin",({username,email,password,confirmpassword}));
        console.log(response.data);
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
      }else if(err.response.data === "user exists"){

        // error if the email already exists
        setError("Email Already Exists");
      }else if(err.response.data === "Fill all inputs"){

        // error if all the inputs are not filled
        setError("Fill All Inputs");
      }
      else{

        // to catch any unkown error
        setError("Sign In Failed")
      }
    }
  }

  return (
    <>
        <form className='signinForm' onSubmit={handleSubmit}>
            {error && <div className='formErrors'>
              <FontAwesomeIcon icon={faCircleExclamation} style={{marginRight:'10px'}}/>
              {error}
              </div>}
  
            <h2 className='title'>Sign In</h2>

            {signinInp.map((inp) => <FormInputs type={inp.type} placeholder={inp.placeholder} name={inp.name} value={inp.value} handleChange={handleChange} handleBlur={handleBlur} err={inp.err} icon={inp.icon} id={inp.id} handlePassword={handlePassword}/>)} 

          
            <button type='submit' className='btn'>Sign In</button>

            <div className='hr'/>

            <div className='loginsigninLink'>Have An Account? <span onClick={() => {setSignIn(false)}}> Log In</span></div>
        </form>
    </>
  )
}

export default Signin