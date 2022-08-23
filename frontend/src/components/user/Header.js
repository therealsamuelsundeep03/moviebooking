import React, { useState } from 'react';
import { useContext } from 'react';

import "../../css/header.css";
import ThemeContext from '../../context/theme';
const Header = () => {
  const [show,setShow] = useState(false);

  const {theme,setTheme} = useContext(ThemeContext);

  const handleTheme = (theme) => {
    setShow(false);
    if(theme === "light"){
      setTheme(false);
    }else{
      setTheme(true);
    }
  }

  return (
    <header className={`${theme ? "darkHeader" : "lightHeader"}`}>
        <h3>Book My Movie</h3>
        <div className='hamIcom'>
          <span className="material-symbols-outlined hamburger" onClick={() => {setShow(!show)}}>
            menu
          </span>
          <div className={`${show ? "showThemes" : "showThemesNull"} ${theme ? "darkdrop" : "lightdrop"}`}>
            <div onClick={() => {handleTheme("light")}}>Light</div>
            <div  onClick={() => {handleTheme("dark")}}>Dark</div>
          </div>
        </div>
      </header>
  )
}

export default Header