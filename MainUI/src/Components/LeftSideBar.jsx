import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '../styles/left-side-bar.css';

library.add(fas);

function LeftSideBar() {
  const [activeItem, setActiveItem] = useState('home');

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div>
      <div className='left-side-bar'>
        <div>
          <br />
          <h4 className='mb-4'>Navigation</h4> 
          <div className='items'>
            <div className={activeItem === 'home' ? 'bg-primary-800' : ''} onClick={() => handleItemClick('home')}>
              <div>
                <span><FontAwesomeIcon icon="house" /></span>
                <span>Home</span>
              </div>
            </div>

            <div className={activeItem === 'live' ? 'bg-primary-800' : ''} onClick={() => handleItemClick('live')}>
              <div>
                <span><FontAwesomeIcon icon="play" /></span>
                <span>Live</span>
              </div>
            </div>
            
            <div className={activeItem === 'favourites' ? 'bg-primary-800' : ''} onClick={() => handleItemClick('favourites')}>
              <div>
                <span><FontAwesomeIcon icon="star" /></span>
                <span>Favourites</span>
              </div>
            </div>
          </div>
        </div>
        <br /> 

        <div>
          <h4 className='mb-4'>Sports</h4>
          <div className='items'>
            <div className={activeItem === 'football' ? 'bg-primary-800' : ''} onClick={() => handleItemClick('football')}>
              <div>
                <span><FontAwesomeIcon icon="futbol" /></span>
                <span>Football</span>
              </div>
            </div>

            <div className={activeItem === 'nfl' ? 'bg-primary-800' : ''} onClick={() => handleItemClick('nfl')}>
              <div>
                <span><FontAwesomeIcon icon="football" /></span>
                <span>NFL</span>
              </div>
            </div>

            <div className={activeItem === 'basketball' ? 'bg-primary-800' : ''} onClick={() => handleItemClick('basketball')}>
              <div>
                <span><FontAwesomeIcon icon="basketball" /></span>
                <span>Basketball</span>
              </div>
            </div>
            
            <div className={activeItem === 'baseball' ? 'bg-primary-800' : ''} onClick={() => handleItemClick('baseball')}>
              <div>
                <span><FontAwesomeIcon icon="baseball-bat-ball" /></span>
                <span>Baseball</span>
              </div>
            </div>

            <div className={activeItem === 'volleyball' ? 'bg-primary-800' : ''} onClick={() => handleItemClick('volleyball')}>
              <div>
                <span><FontAwesomeIcon icon="volleyball" /></span>
                <span>Volleyball</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
}

export default LeftSideBar;
