import React, { useEffect, useState } from 'react'
import '../styles/content-area.css'
import heroImage from '../assets/hero-image.png'

function ContentArea() {
  return (
    <div className='main-content'>
      {/* <div className='poster bg-primary-800 flex justify-around'>
        <div className='poster-text'>
          <h2>SIGN UP AND GET </h2>
          <p>100% Welcome Bonus</p>
        </div>
        <div className='hero-image-div'><img className='hero-image' src={heroImage} alt="" /></div>
      </div> */}
      
      <div className='match-display'>
        <div>
          <span><b className='text-white text-lg'>Live</b> Matches</span>
        </div>

        <div className='live-match-container flex justify-between'>
          <div className="live-match-display p-2">
            <div className='match-status flex justify-between'>
              <span className='live'>Live</span> 
              <span>'45</span>
            </div>
            <div className='match-teams flex justify-between'>
              <div><img src="https://crests.football-data.org/57.png" alt="" /></div>
              <div>VS</div>
              <div><img src="https://crests.football-data.org/563.png" alt="" /></div>
            </div>

            <div className='match-range'>
              <small className='text-white'>2nd Half 67'</small>
              <div className='range-outer'><div className='range-inner'></div></div>
            </div>

          </div>
         


          {/* dummy place-holders */}
          <div className="live-match-display"></div>
          <div className="live-match-display"></div>
        </div>
      </div>
    </div>
  )
}

export default ContentArea