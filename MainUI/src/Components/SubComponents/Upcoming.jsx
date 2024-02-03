import React from 'react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import Message from './Message';
import { useLocalStorageSelections } from './utils';

library.add(fas);

function Upcoming({ data, setData, localStorageItems, addToSlip, resultCount, setRegisteredBets}) {
  
  const nHasMatches = data.some(match => match.status && match.status !== 'IN_PLAY');

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
                  match.status !== 'IN_PLAY' && match.status !== 'PAUSED' ? (
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
                          className='homeWin' 
                          onClick={addToSlip}
                          style={{
                            backgroundColor: localStorageItems.some(item => item.className === 'homeWin' && item.id === `${match.id}`) ? '#144fce' : '#52505069'
                          }}
                        >
                        {match.odds.homeWin}</div>
                        <div 
                          id={match.id} 
                          className='draw' 
                          onClick={addToSlip}
                          style={{
                            backgroundColor: localStorageItems.some(item => item.className === 'draw' && item.id === `${match.id}`) ? '#144fce' : '#52505069'
                          }}
                        >
                        {match.odds.draw}</div>
                        <div 
                          id={match.id} 
                          className='awayWin' 
                          onClick={addToSlip}
                          style={{
                            backgroundColor: localStorageItems.some(item => item.className === 'awayWin' && item.id === `${match.id}`) ? '#144fce' : '#52505069'
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
              ) : resultCount === 0 ? (
                <>
                  <br /> 
                  <Message header={"Check back tomorrow"}>
                  There are no matches on our coverage today
                  </Message>
                </>
              ) : <>
                    <br /> 
                    <Message header={"Loading Upcoming Matches ..."}>
                    {/* There are no matches on our coverage today */}
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
