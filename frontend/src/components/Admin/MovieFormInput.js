import React from 'react';
import "../../css/movieforminput.css";

const MovieFormInput = ({label,type,name,placeholder,value,handleChange,handleBlur,err,className}) => {
    return (
    <>
        <div className='movieFormInputs'>
            <label>{label}</label>
            <input 
            type = {type}
            name = {name}
            placeholder = {placeholder}
            value = {value}
            onBlur={handleBlur}
            onChange={handleChange}
            />
            <span className='movieFormError'>{err}</span>
        </div>
    </>
    )
}

export default MovieFormInput