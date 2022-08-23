import React, { useState } from 'react'
import { useLocation,useNavigate } from "react-router-dom";

import Header from "../../components/Admin/Header";
import "../../css/addmovies.css";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Addmovie = () => {
  const [movieDetails,setMovieDetails] = useState([{
      moviename:"",poster : "",langs:[],genre:"",firstShow:"",secondShow:"",thirdShow:""
  }])

  const [errors,setErrors] = useState([{
    moviename:"",poster : "",langs:[],genre:"",firstShow:"",secondShow:"",thirdShow:""
  }])

  const [err,setErr] = useState();
  
  const axiosPrivate = useAxiosPrivate();

  const [touched,setTouched] = useState([{
    moviename:false,poster :false,langs:false,genre:false,firstShow:false,secondShow:false,thirdShow:false,
  }])

  // to get the hall details from the adminpage...
  const  {state:{hallname,location,seats,price,hallExists}} = useLocation();
  // console.log(hallname,location,seats,price,hallExists);

  const navigate = useNavigate();

  // to add more inputs to the feild
  const addMoreInputs = (e) => {
    e.preventDefault();   

    let error = errors[errors.length-1];
    error = Object.values(error).filter(err => err !== "");

    let notTouched = touched[touched.length-1];
    notTouched = Object.values(notTouched).filter(err => !err);

    if(!notTouched.length){
      setMovieDetails([...movieDetails,{moviename : "", poster : "", langs : "",genre:"",firstShow:"",secondShow:"",thirdShow:""}])
      setErrors([...errors,{moviename : "", poster : "", langs : "",genre:"",firstShow:"",secondShow:"",thirdShow:""}])
      setTouched([...touched,{moviename : false, poster : false, langs : false,genre:false,firstShow:false,secondShow:false,thirdShow:false}])
    }else if(notTouched.length){
      setErr("Fill All The Inputs")
    }

  }

  // remove input
  const removeInput = (idx,e) => {
    e.preventDefault()
    const newValues = [...movieDetails];
    newValues.splice(idx,1);
    setMovieDetails(newValues);
  }

  // to handle validations and the user input
  const handleChange = (i,{target:{name,value}}) => {
    let newValues = [...movieDetails];

    if(newValues[i][name] === newValues[i]["moviename"]){
      newValues[i]["moviename"] = value.toUpperCase()
    }else{
      newValues[i][name] = value;
    }
    
    setMovieDetails(newValues);
    
    const error = [...errors];
    

    switch(name){
      case "moviename" : 
        error[i].moviename = !value ? "Enter The Movie Name" : "" 
        break;

      case "poster" : 
        error[i].poster = !value ? "Please Enter A Valid URL" : ""
        break;

      case "langs" : 
        error[i].langs = !value ? "Please Enter Languages" : ""
        break;

      case "genre" : 
        error[i].genre = !value ? "Enter Genre Of The Movie" : ""
        break;

      case "firstShow" : 
        error[i].firstShow = !value ? "Enter The Time" : ""
        break;

      case "secondShow" : 
        error[i].secondShow = !value ? "Enter The Time" : ""
        break;

      case "thirdShow" : 
        error[i].thirdShow = !value ? "Enter The Time" : ""
        break;

      default : return 
    }
    
    setErrors(error);
  }

  const handleBlur = (i,{target:{name}}) => {
    const touch = [...touched];
    touch[i][name] = true;
    setTouched(touch);
    setErr("")
  }

  // console.log(firstShow,secondShow,thirdShow)
  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      const id = localStorage.getItem("id");
      console.log(movieDetails)
      const { data } = await axiosPrivate.post(`/halls/${hallExists ? "/addMovies" : "/"}`,{
        id,hallname,location,price,seats,movieDetails
      })
      // console.log(data);
      if(data === "Hall Details Added To The DB"){
        alert("Movies are successfully added to the database");
        navigate("/hallInfo");
      }
    }
    catch(err){
      console.log(err.response.data);
      if(err.response.data === "Fill All The Inputs"){
        setErr("Fill All The Inputs");
        window.scrollTo(0,0);
      }else if(err.response.data === "hall owned by another admin"){
        setErr("Hall Owned By Another Admin");
        window.scrollTo(0,0);
      }
    }
  }

  return (
    <>
      <div className='addmovie'>
        <Header />
        <form onSubmit={handleSubmit}>
          { movieDetails.map((inp,idx) => {
            return (
              <>
                { 
                  movieDetails.length-1 === idx && (
                   <span className='addMovieErrors'>{err}</span> 
                  )}

              {/* movie name */}
                <div  className='addMovieForm'>
                  <label>Movie Name</label>
                  <input type={"text"} placeholder="Eg. KGF" name="moviename" value={inp.moviename} onChange={(e) => {handleChange(idx,e)}} onBlur={(e) => {handleBlur(idx,e)}}/>
                  {movieDetails.length-1 === idx && (
                   <span className='addMovieErrors'>{errors[errors.length-1].moviename}</span> 
                  )}
                </div>

              {/* poster url */}
                <div  className='addMovieForm'>
                    <label>Poster URL</label>
                    <input type={"url"} placeholder="Movie Image URL" name="poster" value={inp.poster} onChange={(e) => {handleChange(idx,e)}} onBlur={(e) => {handleBlur(idx,e)}}/>
                    {movieDetails.length-1 === idx && (
                      <span className='addMovieErrors'>{errors[errors.length-1].poster}</span> 
                    )}
                </div>
              
              {/*Languages */}
                <div  className='addMovieForm'>
                    <label>Languages</label>
                    <input type={"text"} placeholder="Eg. Tamil,Telugu" name="langs" value={inp.langs} onChange={(e) => {handleChange(idx,e)}} onBlur={(e) => {handleBlur(idx,e)}}/>
                    {movieDetails.length-1 === idx && (
                      <span className='addMovieErrors'>{errors[errors.length-1].langs}</span> 
                    )}
                </div>
              
              {/*genre */}
                <div  className='addMovieForm'>
                    <label>Genre</label>
                    <input type={"text"} placeholder="Eg. Action,Horror" name="genre" value={inp.genre} onChange={(e) => {handleChange(idx,e)}} onBlur={(e) => {handleBlur(idx,e)}}/>
                    {movieDetails.length-1 === idx && (
                      <span className='addMovieErrors'>{errors[errors.length-1].genre}</span> 
                    )}
                </div>

              {/* first show */}
                <div  className='addMovieForm'>
                    <label>First Show</label>
                    <input type={"time"} name="firstShow" value={inp.firstShow} onChange={(e) => {handleChange(idx,e)}} onBlur={(e) => {handleBlur(idx,e)}}/>
                    {movieDetails.length-1 === idx && (
                      <span className='addMovieErrors'>{errors[errors.length-1].firstShow}</span> 
                    )}
                  {/* <span className='addMovieErrors'>{errors[errors.length-1].langs}</span> */}
                </div>
                <div  className='addMovieForm'>
                    <label>Second Show</label>
                    <input type={"time"} name="secondShow" value={inp.secondShow} onChange={(e) => {handleChange(idx,e)}} onBlur={(e) => {handleBlur(idx,e)}}/>
                    {movieDetails.length-1 === idx && (
                      <span className='addMovieErrors'>{errors[errors.length-1].secondShow}</span> 
                    )}
                </div>
                <div  className='addMovieForm'>
                    <label>Third Show</label>
                    <input type={"time"} name="thirdShow" value={inp.thirdShow} onChange={(e) => {handleChange(idx,e)}} onBlur={(e) => {handleBlur(idx,e)}}/>
                    {movieDetails.length-1 === idx && (
                      <span className='addMovieErrors'>{errors[errors.length-1].thirdShow}</span> 
                    )}
                </div>

              {movieDetails.length-1 !== idx && (
                <div  className='addMovieForm'>
                  <button onClick={(e) => {removeInput(idx,e)}} className="addMoiveBtn" id="remove">Remove</button>
                </div>
              )}

              {movieDetails.length-1 === idx && (
                <>
                  {/* add more inputs */}
                  <div className='addMovieForm'>
                    <button onClick={(e) => {addMoreInputs(e)}} className="addMoiveBtn" id="add">Add More</button>
                  </div>

                  <div>
                  <button type="submit" className="addMoiveSubmitBtn">Submit</button>
                  </div>
                </>
              )}
              </>
            )
          })}
        </form>
      </div>
    </>
  ) 
}

export default Addmovie;




