import React,{ useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const FormInputs = ({type,name,placeholder,value,handleChange,handleBlur,err,icon,id,handlePassword}) => {
  const [passIcon,setPassIcon] = useState(false);
  
  return (
      <>
        <div className={`inputFeild ${id === "pass" ? "pass" :""}`}>
          <FontAwesomeIcon className='icon' icon={icon}/>
          <input
          type={type} 
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          />
          {placeholder === "Password" ? <FontAwesomeIcon className='PassIcon' icon={passIcon ? faEye : faEyeSlash} onClick={() => {
            setPassIcon(!passIcon);
            handlePassword();
          }}/> : ""}
          <span className='loginSigninerr'>{err}</span>
        </div>
      </>
  )
}

export default FormInputs