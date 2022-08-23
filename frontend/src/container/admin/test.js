<div className={`container ${signIn ? "setSignIn" : ""}`}>
<div className='formsContainer'>
  <div className='loginSignin'>
 
    
  </div>
</div>
<div className='panelsContainer'>
  <div className='panel leftPanel'>
    <div className='content'>
      <h3>Hello,</h3>
      <h4>Welcome Back To Book My Movie!</h4>
      <button className='btn transparent' id='signinBtn' onClick={() => {setSignIn(true)}}>Sign In</button>
    </div>
    {/* img */}
  </div>
  <div className='panel rightPanel'>
    <div className='content'>
      <h3>Hello,</h3>
      <h4>Welcome Back To Book My Movie!</h4>
      <button className='btn transparent' id='loginBtn' onClick={() => {setSignIn(false)}}>Sign In</button>
    </div>
  </div>
</div> 

</div>



















// import React, { useEffect, useState } from 'react';

// import FormInputs from '../FormInputs';
// import axios from "../../service/backendUrl";
// import "../../css/signin.css"

// const Signin = () => {
//   const [user,setUser] = useState({
//     username:"",
//     email:"",
//     password:"",
//     confirmpassword:"",
//     errors:{
//       username:"",
//       email:"",
//       password:"",
//       confirmpassword:""
//     },
//     touched:{
//       username:false,
//       email:false,
//       password:false,
//       confirmpassword:false,
//     }
//   });

//   const [error,setError] = useState("")

//   const signinInp = [
//     {label:"Username", type:"text", name:"username", value:user.username,placeholder:"Username",err:user.errors.username},  
//     {label:"Email", type:"email", name:"email", value:user.email,placeholder:"Eg. abc@gmail.com",err:user.errors.email},  
//     {label:"Password", type:"password", name:"password", value:user.password,placeholder:"Password",err:user.errors.password,id:"password"},  
//     {label:"Confirm Password", type:"password", name:"confirmpassword", value:user.confirmpassword,placeholder:"Confirm Password",err:user.errors.confirmpassword},  
//   ]

//   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_]).{8,24}$/;

//   // setting input and handling validations
//   const handleChange = ({target:{name,value}}) => {
//     const errors = user.errors;

//     switch(name){
//       case "username" : 
//         errors.username = !value ? "Enter Username" : "";
//         break;

//       case "email" : 
//         errors.email = !value ? "Enter A Email Address" : "";
//         break;

//       case "password" : 
//         const result = passwordRegex.test(user.password);
//         errors.password = result ? "":"8 to 24 characters \r  Must include a upercase as well as lower case characters and a special character Allowed special characters:!@#$%^&*_";

//       case "confirmpassword" : 
//         if(value !== user.password){
//           errors.confirmpassword = "Password Doesn't Match";
//         }else{
//           errors.confirmpassword = "";
//         }
//     }

//     setUser({...user,[name]:value},errors)
//   }

//   // to check if the user has been to this input or not
//   const handleBlur = ({target:{name}}) => {
//     const touched = {...user.touched,[name]:true};
//     setUser({...user,touched});
//   }

//   // disable submit button until all the inputs are validated
//   const errorsLength = Object.values(user.errors).filter(err => err !== "").length;
//   const notTouchedLength = Object.values(user.touched).filter(err => !err).length;

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     try{
//       const errors = user.errors;

//       // if no errors then send the data to the backend...
//       if(errorsLength === 0 && notTouchedLength === 0){

//         // if the user is validated then send the response to the backend
//         const {username,email,password,confirmpassword} = user
//         const response = await axios.post("/signin",({username,email,password}));
//         console.log(response.data);
//       }else{
//         errors.username="Fill All Inputs";
//         console.log("error")
//         setUser({...user,errors})
//       }
//     }
//     catch(err){

//       // if no response from then send an error on network connectivity
//       if(!err.response){
//         setError("Check Internet Connectivity");
//       }else if(err.response.data === "user exists"){

//         // error if the email already exists
//         setError("Email already exists");
//       }else if(err.response.data === "Fill all inputs"){

//         // error if all the inputs are not filled
//         setError("Fill all inputs");
//       }
//       else{

//         // to catch any unkown error
//         setError("Sign In Failed")
//       }
//     }
//   }

//   console.log(error);

//   return (
//     <>
//       <div className='login'>
//         <form onSubmit={handleSubmit}>
//           {signinInp.map(inp => <FormInputs key={inp.label} label={inp.label} type={inp.type} name={inp.name} value={inp.value} placeholder={inp.placeholder} handleChange={handleChange} handleBlur={handleBlur} err={inp.err} id={inp.id}/>)}
//           <button disabled={errorsLength === 0 || notTouchedLength === 0}>Submit</button>
//         </form>
//       </div>
//     </>
//   )
// }

// export default Signin