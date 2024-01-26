import React, { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import '../styles/right-side-bar.css';
import BetSlip from './SubComponents/BetSlip';
import BetHistory from './SubComponents/BetHistory';

function RightSideBar({ data, setData, localStorageItems, addToSlip}) {
  const [slipCount, setSlipCount] = useState(0);
  const [betCount, setBetCount] = useState(0);
  const [isActive, setIsActive] = useState('bet-slip');
  
  // useEffect(() => {
  //   console.log(localStorageItems); 
  // }, [localStorageItems]);

  const toggleActive = (param) => {
    setIsActive(param);
  };

  return (
      <>
        <div className='right-side-bar'>
        <div className='right-side-bar-header flex justify-between'>
          <Link 
            to="/bet-slip" 
            className={isActive === 'bet-slip' ? 'active' : ''}
            onClick={ () => toggleActive('bet-slip')}  
          >
            Bet Slip {slipCount}
          </Link>

          <Link 
            to="/bet-history" 
            className={isActive === 'bet-count' ? 'active' : ''} 
            onClick={ () => toggleActive('bet-count')} >
            Bet History {betCount}
          </Link>
        </div>
        <br />

        <div className='right-side-content'>
          <Routes>
            <Route path="/" element={<BetSlip data={data} setData={setData} localStorageItems={localStorageItems} addToSlip={addToSlip} />} />
            <Route path="/bet-slip" element={<BetSlip data={data} setData={setData} localStorageItems={localStorageItems} addToSlip={addToSlip}/>} />
            <Route path="/bet-history" element={<BetHistory />} />
          </Routes>
        </div>
      </div>
      </>
  );
}

export default RightSideBar;
