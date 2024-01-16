import React, { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import '../styles/right-side-bar.css';
import BetSlip from './SubComponents/BetSlip';
import BetHistory from './SubComponents/BetHistory';

function RightSideBar({ data, setData, localStorageItems, addToSlip }) {
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

  useEffect(() => {
    console.log(localStorageItems); 
  }, [localStorageItems]);

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
            <Route path="/bet-slip" element={<BetSlip localStorageItems={localStorageItems}/>} />
            <Route path="/bet-history" element={<BetHistory />} />
          </Routes>

          <div className='slip-holder p-3'
            style={{display: localStorageItems.length === 0 ? 'none' : 'block'}}
          >
            <div className='bet-match-info'>
              <div className='flex justify-between'>
                <div className='w-100'>
                  <h3 className='outcome'>Home</h3>
                  <div className='picked-teams flex'>
                    <small className='live'>Live </small>
                    <small className='teams'> Arsenal vs Wolverhamptopn</small>
                  </div>
                </div>

                <div>
                  <h3>X</h3>
                </div>
              </div>

              <div className='flex justify-between'>
                <small className="mkt">1x2</small>
                <h3 className='odd'>3.14</h3>
              </div>
              <div className='hr'></div>
            </div>

            <div className='bet-match-info'>
              <div className='flex justify-between'>
                <div className='w-100'>
                  <h3 className='outcome'>Away</h3>
                  <div className='picked-teams flex'>
                    <small className='live'>Live </small>
                    <small className='teams'> Manchester city vs Liverpool</small>
                  </div>
                </div>

                <div>
                  <h3>X</h3>
                </div>
              </div>

              <div className='flex justify-between'>
                <small className="mkt">1x2</small>
                <h3 className='odd'>3.14</h3>
              </div>
              <div className='hr'></div>
            </div>
            
            <div>
              <div className='flex justify-between py-4'>
                <h3>Total Stake</h3>
                <div className='input-div flex justify-between'>
                  <span>NGN</span>
                  <input type="number" />
                </div>
              </div>
              <div className='flex justify-between'>
                <h3>Odds</h3>
                <h3>10.69</h3>
              </div>
              <br />
              <div className='flex justify-between'>
                <h3>Potential Win</h3>
                <h3>0</h3>
              </div>
              <div className='submit-slip'>STAKE</div>
            </div>

          </div>

        </div>
      </div>
    </Router>
  );
}

export default RightSideBar;
