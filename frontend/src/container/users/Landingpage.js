import React,{ useEffect, useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import ThemeContext from "../../context/theme";
import Header from '../../components/user/Header';
import Filters from '../../components/user/Filters';
import axios from "../../service/backendUrl";
import getMovies from '../../service/getMovies';
import "../../css/landing.css";

const Landingpage = () => {

  // common movies array to filter from
  const [allMovies,setAllMovies] = useState([]);

  // to display the movies
  const [movies,setMovies] = useState();

  // to change the color of lang when selected in filter column
  const [selected,setSelected] = useState("");

  // to get the movie details for the popup to select the lan from
  const [selectedMovie,setSelectedMovie] = useState([]);

  // to display errors...
  const [err,setErr] = useState("");

  const navigate = useNavigate(); 

  useEffect(() => {

    // fetching movies..
    const fetchData = async() => {
      try{
        let data = await getMovies();
        setMovies(data);
        setAllMovies(data);
      }
      catch(err){
        setErr("Please Check The Internet Connectivity");
      }
    }

    fetchData();
  },[])

  // get theme
  const { theme } = useContext(ThemeContext);

  // on clicking on a movie it must be directed to the page where halls are listed
  const handleNavigation = (moviename,langs,lang,id) => {
    // movie name with no spacings
    const movieName = moviename;

    localStorage.setItem("id",id);

    // navigating to the halls page...
    navigate(`/movie/${movieName}`,{state : {moviename,langs,lang}});
  }

  // filter functions.

  // filtering movies based on lang.
  const getMoviesBasedOnLang = (lang) => {
    setSelected(lang)
    const moviesBasedOnLang = [];

    // if i am setting state for just movies then the next lang movies are selected from the previous lang movies
    // so i needed to use all movies for a common background
    (allMovies.map(movie => {
      if(movie.langs.includes(lang)){
        moviesBasedOnLang.push(movie)
      }
    }));

    setMovies(moviesBasedOnLang);
  }

  const getMoviesBasedOnGenre = (genre) => {
    setSelected(genre)
    const moviesBasedOnGenre = [];

    // if i am setting state for just movies then the next lang movies are selected from the previous lang movies
    // so i needed to use all movies for a common background
    (allMovies.map(movie => {
      if(movie.genre.includes(genre)){
        moviesBasedOnGenre.push(movie)
      }
    }));

    setMovies(moviesBasedOnGenre);
  }
  // console.log(movies)
  
  return(
    <>
      {err ?  
        <div className='landingErr'>
          <div>Some problem occured</div>
          <div>{err} or Try after some time.</div>
          </div> : (    
            <>
              <Header />
        
              {/* body  */}
              <main>
                <div className={`moviesContainer ${theme ? "darkmoviesContainer" : "lightmoviesContainer"}`}>
                  <Filters selected={selected} setSelected={setSelected} allMovies={allMovies} setMovies={setMovies} getMoviesBasedOnGenre={getMoviesBasedOnGenre}  getMoviesBasedOnLang={getMoviesBasedOnLang}/>
                  
                  {/* movies */}
                  {movies ? (
                    <>
                    <div className='movies'>
                        {movies.map(movie => {
                          return (
                            <div className='movie' key={movie.movie} onClick={() => {setSelectedMovie({movie})}}>
                              <div className='movieImg'>
                                <img src={movie.poster}/>
                              </div>
                              <div className={`movieName ${theme ? "darkmovieName" : "lightmovieName"}`}>{movie.moviename.toUpperCase()}</div>
                              <div className={`movieLang ${theme ? "darkmovieLang" : "lightmovieLang"}`}>{movie.langs.toString()}</div>
                            </div>
                          )
                        })}
                      </div>
                  </>
                  ) : (
                    <div>Loading... </div>
                  )}
                </div>
              

                {selectedMovie.length === 0 ? "":  ( 
                  <div className='dialogBoxForLang'>
                    <div className={`dialogBox ${theme ? "darkdialogBox" : ""}`}>
                        <>
                          <div className='movieDet'>
                            <div className='moviename'>
                              {selectedMovie.movie.moviename}
                            </div>
                            <span className="material-symbols-outlined close" onClick={() => {setSelectedMovie([])}}>
                              close
                            </span>
                          </div> 
                          <div className='title'>Select Language</div>
                          <div className='selectedLangs'>
                              {selectedMovie.movie.langs.split(",").map(lang => <div className='selectLang' onClick={() => {handleNavigation(selectedMovie.movie.moviename,selectedMovie.movie.langs,lang,selectedMovie.movie.id)}}>{lang}</div>)} 
                          </div>
                        </>
                    </div>
                  </div>
                )}
                </main>   
          </>
        )}
    </>
  )
}
export default Landingpage;












































