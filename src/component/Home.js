import React from 'react'
import {useNavigate} from "react-router-dom"
import "./home.css";

function Home() {
    const history = useNavigate();

  return (
    <div className='homebox'>
        <div className='home_header'>
            <h1></h1>
        </div>
        <div className='home_grid'>
        <div>
            <li>“Time and health are two precious assets that we don't recognize and appreciate until they have been depleted.”</li>
            <li>“A good laugh and a long sleep are the best cures in the doctor's book.”</li>
            <li>“A fit body, a calm mind, a house full of love. These things cannot be bought - they must be earned.”</li>
        </div>
        <div className='home_btnbox'>
            <button className='homebtn' onClick={()=>history("/customerlogin")}>Enter as a Customer</button>
            <button className='homebtn' onClick={()=>history("/expertlogin")}>Enter as a Health specialist</button>
        </div>
        </div>
    </div>
  )
}

export default Home