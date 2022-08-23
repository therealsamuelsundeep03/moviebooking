import React,{  useContext } from 'react'
import ThemeContext from '../../context/theme';

const DisplayHalls = ({halls,handleNavigation,day}) => {
    const currentTime = +(new Date().getHours()+""+(new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes()));
    
    // console.log(halls)
    const { theme } = useContext(ThemeContext);
    return (
    <>
        {halls.map(hall => {
            return(
                <>
                {/* rendering halls */}
                <div className='' key={hall.hallname}>
                        <div className='hallDet'>
                            <div className='hallName'>{`${hall.hallname} : ${hall.location}`}</div> 
                            <div className='halladdl'>
                                <div className='green'>
                                    <span class="material-symbols-outlined food">
                                        smartphone
                                    </span>
                                    M-Ticket
                                </div>
                                <div className='orange'>
                                    <span class="material-symbols-outlined food">
                                        fastfood
                                    </span>
                                    Food & Beverages
                                </div>
                            </div>
                        </div>

                        {/* hall timings    */}
                        {day === "today" ? (
                            <>
                                <div className='halltimings'>
                                    {hall.showTimings.map(showTime => Object.values(showTime).map(show =>  <div className={`halltime ${(+(show.replace(":",""))) > currentTime ? "" :  theme ? "darkdefaultCursor" : "defaultCursor" }`} onClick={() => {handleNavigation(Object.keys(showTime),Object.values(showTime),hall)}}>{show}</div>))}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='halltimings'>
                                    {hall.showTimings.map(showTime => Object.values(showTime).map(show =>  <div className={`halltime`} onClick={() => {handleNavigation(Object.keys(showTime),Object.values(showTime),hall)}}>{show}</div>))}
                                </div>
                            </>
                        )}
                </div>
                <div className='bb'/>
                </>
            )
        })}
    </>
  )
}

export default DisplayHalls