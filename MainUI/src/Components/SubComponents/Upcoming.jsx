import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocalStorageSelections } from './utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import Message from './Message';
import RightSideBar from '../RightSideBar'

library.add(fas);

function Upcoming({ data, setData }) {
  const storageKey = 'slipSelections'; // Same key for both components
  const { localStorageItems, addToSlip } = useLocalStorageSelections(storageKey);
  const [responseMessage, setResponseMessage] = useState({});
  const nHasMatches = data.some(match => match.competition.id && match.competition.id !== 2021);

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

 
  return (
    <>
      
      <section>
        <div>
          <h2><b className='text-white text-lg'>Football</b> Upcoming</h2>
        </div>

        <br />

        <div className='upcoming-match-display'>
          <div className='upc-header p-2 flex justify-between'>
            <div className='upc-match-info'>
              <div className='upc-date'>Date</div>
              <div className='upc-status'></div>
            </div>

            <div className='upc-odds-header'>
              <div className='inner-upc-odds-header flex'>
                <div>1</div>
                <div>x</div>
                <div>2</div>
              </div>
            </div>

            <div className='markets flex'>
              <div>COM</div>
            </div>
          </div>

          <div className='scroll-area'>
            {
              nHasMatches ? (
                data.map((match, index) => (
                  match.competition.id !== 2021 ? (
                  <div key={index} className='upc-fixtures-display p-3 flex justify-between'>
                    <div className='upc-match-info flex'>
                      <div>
                        <b className='text-white'>15:00</b>
                        <br />
                        TODAY
                      </div>
                      <div className='match-status-display grid place-content-center'>
                          <FontAwesomeIcon icon={faStar} />
                      </div>
                    </div>
    
                    <div className='upc-odds-header flex justify-between v-center'>
                      <div className='upc-home-team flex'>
                        <b className='text-white'>{match.homeTeam.tla}</b>
                        <img src={match.homeTeam.crest} alt="" />
                      </div>
    
                      <div className='inner-upc-odds-header upc-odds-display text-white'>
                        <div 
                          id={match.id} 
                          className='1' 
                          onClick={addToSlip}
                          style={{
                            backgroundColor: localStorageItems.some(item => item.className === '1' && item.id === `${match.id}`) ? '#144fce' : '#52505069'
                          }}
                        >
                        {match.odds.homeWin}</div>
                        <div 
                          id={match.id} 
                          className='x' 
                          onClick={addToSlip}
                          style={{
                            backgroundColor: localStorageItems.some(item => item.className === 'x' && item.id === `${match.id}`) ? '#144fce' : '#52505069'
                          }}
                        >
                        {match.odds.draw}</div>
                        <div 
                          id={match.id} 
                          className='2' 
                          onClick={addToSlip}
                          style={{
                            backgroundColor: localStorageItems.some(item => item.className === '2' && item.id === `${match.id}`) ? '#144fce' : '#52505069'
                          }}
                        >
                        {match.odds.awayWin}</div>
                      </div>
    
                      <div className='upc-away-team flex'>
                        <img src={match.awayTeam.crest} alt="" />
                        <b className='text-white'>{match.awayTeam.tla}</b>
                      </div>
                    </div>
    
                    <div className='markets flex justify-between'>
                      {/* <div>{match.competition.code}</div> */} {/* uncomment to add competition code alongside emblem in the 'COM' section */}
                      <div className='mkt-img'><img src={match.competition.emblem} alt="" /></div>
                    </div>
                  </div>) : null
                ))
              ) : <>
                    <br /> 
                    <Message header={"Come back tomorrow!"}>
                    There are no matches on our coverage today
                    </Message>
                  </>
            }
          </div>
        </div>
      </section>
    </>
  );
}

export default Upcoming;
