import React,{ useState,useContext } from 'react';

import ThemeContext from '../../context/theme';

const Filters = ({selected,getMoviesBasedOnLang,allMovies,setMovies,getMoviesBasedOnGenre}) => {
    const [langExpand,setLangExpand] = useState(false);
    const [genreExpand,setGenreExpand] = useState(false);

    const langs = ["Tamil","Telugu","English","Malayalam","Kannada","Hindi"];
    const genre = ["Action","Love","Biography","Horror","Revenge","Crime","Thriller"];


    // get theme
    const {theme} = useContext(ThemeContext);

    const handleExpand = () => {
        setLangExpand(!langExpand)
    }

    const handleGenreExpand = () => {
        setGenreExpand(!genreExpand)
    }

    return (
        <div className='filters'>
            <h3 className={`${theme ? "dark" : "light"}`}>Filters</h3>
            <div className='filterContainer'>

                <div className={`filter ${theme ? "darkFilter" : "lightFilter"}`} id='langFilter'>
                    <div className='filterName'>
                        <div className={`${theme ? "lightgreen" : "red"}`}>
                            Language
                            <span className="material-symbols-outlined expand" onClick={handleExpand}>
                                {langExpand ? "expand_more" : "expand_less"}
                            </span>
                        </div>
                        <div className='grey' onClick={() => {setMovies(allMovies)}} >Clear</div>
                    </div>
                    <div className={`langs ${langExpand ? "show" : ""}`}>
                        {langs.map(lang =>  <div className={`lang ${theme ? "darklang" : "lightlang"} ${selected===lang ? `selected  ${theme ? "darkSelected" : "lightSelected"}`  : ""}`}  onClick={() => {getMoviesBasedOnLang(lang)}}>{lang}</div>)}
                    </div>
                </div>

                <div  className={`filter ${theme ? "darkFilter" : "lightFilter"}`} id='genreFilter'>
                    <div className='filterName'>
                        <div className={`${theme ? "lightgreen" : "red"}`} >
                            Genre
                            <span className="material-symbols-outlined expand" onClick={handleGenreExpand}>
                                {genreExpand ? "expand_more" : "expand_less"}
                            </span>
                        </div>
                        <div className='grey' onClick={() => {setMovies(allMovies)}}>Clear</div>
                    </div>
                    <div className={`langs ${genreExpand ? "show" : ""}`}>
                        {genre.map(gen =>  <div className={`lang ${selected===gen ? "selected" : ""}`}  onClick={() => {getMoviesBasedOnGenre(gen)}}>{gen}</div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filters;