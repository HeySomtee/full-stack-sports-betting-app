import React, { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import '../styles/right-side-bar.css';
import BetSlip from './SubComponents/BetSlip';
import BetHistory from './SubComponents/BetHistory';

function RightSideBar({ data, setData, localStorageItems, addToSlip}) {
  const [slipCount, setSlipCount] = useState(0);
  const [betCount, setBetCount] = useState(0);
  const [isActive, setIsActive] = useState('bet-slip');

  const sendDataToBackend = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/odds', {
        key:{
              userId: 'user123',
              bets: [
                {
                  matchId: 'match001',
                  team: 'Team A',
                  odds: 2.5,
                  amountStaked: 50,
                  result: 'win',
                },
              ],
              }
            });

      const responseData = response.data;
      setResponseMessage('Response from Backend: ' + responseData.message);
      console.log(responseMessage);
    } catch (error) {
      console.error('Error sending data to backend:', error.message);
    }
  };

  // useEffect(() => {
  //   console.log(localStorageItems); 
  // }, [localStorageItems]);

  const toggleActive = (param) => {
    setIsActive(param);
  };

  return (
    <Router>
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
            <Route path="/bet-slip" element={<BetSlip data={data} setData={setData} localStorageItems={localStorageItems}/>} />
            <Route path="/bet-history" element={<BetHistory />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default RightSideBar;
