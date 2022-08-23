import React from 'react';

import "../css/notfound.css";
    
function PageNotFound(){
  return(
      <>
        <div className="notfound">
                <div className="img">
                    <img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/error-no-search-results_2353c5.png"/>
                </div>
                <div className="content">
                    <div className="sorry">Sorry, no results found!</div>
                    <div className="sugg">Please check the spelling or try searching for something else</div>
                </div>
          </div>
      </>
  )
}


export default PageNotFound