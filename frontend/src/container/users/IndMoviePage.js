import React,{ useState,useEffect,useContext } from 'react';
import { useLocation,useNavigate } from "react-router-dom";

import axios from "../../service/backendUrl"
import Header from '../../components/user/Header';
import "../../css/indmoviepage.css";
import DisplayHalls from '../../components/user/displayHalls';
import ThemeContext from '../../context/theme';

const IndMoviePage = () => {
    // to have a common ground to store the data
    const [allHalls,setAllHalls] = useState();

    // to filter the data from
    const [halls,setHalls] = useState();

    // to fiilter halls based on the language
    const [selectLang,setSelectLang] = useState();

    // to handle expansion of the lang filter
    const [langExpand,setLangExpand] = useState(false);

    // to display the seating of that particular day
    const [day,setDay] = useState();

    // to get the day in which the movie theatre selected
    let [showDay,setShowDay] = useState('');

    const [err,setErr] = useState("");

    // getting movie name using location
    let {state : {moviename,lang,langs,id}}= useLocation();
   

    const navigate = useNavigate();


    useEffect(() => {
        // setting lang based on the previous page
        setSelectLang(lang)
        setDay("today");
        setShowDay(new Date().getDate() + " " + month[new Date().getMonth()] + " " + new Date().getFullYear());

        // console.log(moviename)
        // fetching halls
        const fetchHalls = async() => {
           try{
             // fetching halls based on the movie
             const { data } = await axios.get(`/halls/${moviename}`);
             setAllHalls(data);
 
             // rendering only the halls where that selected lang is available during mount
             const hallsBasedOnLang = []
             data.filter((hall) => {

                // filter the theatre which includes the selected lang   
                 let timings = []
                 hall.movies.map(({firstShow,secondShow,thirdShow}) => {timings.push({firstShow},{secondShow},{thirdShow})})
                 return (hall.movies[0].langs.includes(lang)) ? hallsBasedOnLang.push({hallname:hall.hallname,location:hall.location,showTimings: timings,seats : hall.seats,price:hall.price,id:hall.id}) : "";
             });
             setHalls(hallsBasedOnLang);
           }
           catch(err){
            setErr("Please Check Internet Connectivity");
           }
        }

        fetchHalls();

    },[]);


    // get theme
    const {theme} = useContext(ThemeContext);

    const handleNavigation = (show,time,hall) => {
        localStorage.setItem("id",hall.id);


        navigate(`/movie/${moviename}/${show.toString()}`,{state : {time : time.toString(),showDay,hall,lang:selectLang}})
    }

    // rendering halls based on lang
    const getHallsBasedOnLang = (lang) => {
        // this is because even though the page gets refreshed it should show halls of the latest selected lang
        // not the halls based on the lang which is selected during the mount

        setSelectLang(lang)

        
        const hallsBasedOnLang = [];
        allHalls.filter((hall) => {
            let timings = []
            hall.movies.map(({firstShow,secondShow,thirdShow}) => {timings.push({firstShow},{secondShow},{thirdShow})})
            return (hall.movies[0].langs.includes(lang)) ? hallsBasedOnLang.push({hallname:hall.hallname,location:hall.location,seats:hall.seats,price:hall.price,showTimings: timings}) : ""
        });

        setHalls(hallsBasedOnLang)
    }

    // to control the icon and the lang list of a movie
    const handleExpand = () => {
        setLangExpand(!langExpand)
    }

    let days = ["Sun","Mon","Tue","Wed","Thurs","Fri","Sat"];
    let month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Nov","Dec"];

    const handleSelectedDay = (day) => {
        setDay(day)
        if(day === "today"){
            setShowDay(new Date().getDate() + " " + month[new Date().getMonth()] + " " + new Date().getFullYear())
        }
        else  if(day === "tom"){
            setShowDay(new Date().getDate() + 1 + " " + month[new Date().getMonth()] + " " + new Date().getFullYear())
        } 
        else  if(day === "dft"){
            setShowDay(new Date().getDate() + 2 + " " + month[new Date().getMonth()] +" " + new Date().getFullYear())
        } 
    }

    // console.log(halls)

    return (
    <>
        {err ? 
            <div className='landingErr'>
                <div>Some problem occured</div>
                <div>{err} or Try after some time.</div>
            </div>: (
                <>
                    {/* header */}
                    <Header />

                    {/* body */}
                    <div className={`indMovieContainer ${theme ? "darkindMovieContainer" : "lightindMovieContainer"}`}>

                        {/* movie name and genre */}
                        <div className={`movieName ${theme ? "darkMovieName" : "lightMovieName"}`}>
                            <h3>{moviename.toUpperCase()}</h3>

                            {/* rendering the genre of the movie */}
                            <div className={`genre ${theme ? "darkMovieGenre" : "lightMovieGenre"}`}>
                            {allHalls ?  (
                                <>
                                    {allHalls[0].movies[0].genre.split(",").map(gen => <div>{gen}</div>)} 
                                </>
                            ): ""}
                            </div>
                        </div>

                        {/* dates and lang*/}
                        <div className={`moviedatesandlang ${theme ? "darkmoviedatesandlang" : "lightmoviedatesandlang"}`}>     
                            <div className='movieDate'>
                                <div className={` date ${day === "today" ? "moviedate today" : ""}`} onClick={() => {handleSelectedDay("today")}}>
                                    <div className='day'>{days[new Date().getDay()]}</div>
                                    <div className='date'>{new Date().getDate()}</div>
                                    <div className='month'>{month[new Date().getMonth()]}</div>
                                </div>
                                <div className={` date ${day === "tom" ? "moviedate today" : ""}`} onClick={() => {handleSelectedDay("tom")}}>
                                    <div className='day'>{days[new Date().getDay() +1] === undefined ? days.concat(days)[new Date().getDay() +1] : days[new Date().getDay() +1]}</div>
                                    <div className='date'>{new Date().getDate()+1}</div>
                                    <div className='month'>{month[new Date().getMonth()]}</div>
                                </div>
                                <div className={` date ${day === "dft" ? "moviedate today" : ""}`} onClick={() => {handleSelectedDay("dft")}}>
                                    <div className='day'>{days[new Date().getDay() +2] === undefined ? days.concat(days)[new Date().getDay() +2] : days[new Date().getDay() +2]}</div>
                                    <div className='date'>{new Date().getDate()+2}</div>
                                    <div className='month'>{month[new Date().getMonth()]}</div>
                                </div>
                            </div>
                            <div className='selectedHallLangs'  onClick={handleExpand}>
                                <div className='Rule ruleleft' />
                                <div className='hallSelectedLang'>
                                    {selectLang}
                                <div className='langhr'/>
                                </div>
                                <span className="material-symbols-outlined expand">
                                    {langExpand ? "expand_more" : "expand_less"}
                                </span>
                                <div className='Rule ruleright' />
                                {/* rendering the langs and the possibilty of selecting the prefered lang */}
                                <div className={`${theme ? "darkhallLangs" : "hallLangs"} hallshow ${(langExpand && langs.split(",").length > 1 ) ? "showHallLang" : ""}`}>
                                    {langs.split(",").map(lang => {return lang !== selectLang ? <div className='hallLang' onClick={() => {setSelectLang(lang); setLangExpand(false); getHallsBasedOnLang(lang)}}>{lang}</div> : ""})}
                                </div>
                            </div>
                        </div>
                        {/* halls */}
                        <div className={`halls ${theme ? "darkhalls" : "lighthalls"}`}>
                            {halls ? (
                            <>
                                {day === "today" && <DisplayHalls day={day}  halls={halls} handleNavigation={handleNavigation}/>}
                                {day === "tom" && <DisplayHalls day={day}  halls={halls} handleNavigation={handleNavigation}/>}
                                {day === "dft" && <DisplayHalls day={day}  halls={halls} handleNavigation={handleNavigation}/>}
                            </>)
                            :(<div>Loading....</div>)
                            }
                        </div>
                    </div>
                </>
            )}
    </>
    )
}

export default IndMoviePage;















