import React, { useEffect, useState } from 'react';
import Message from './Message';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

function BetSlip({ localStorageItems, data, setData, addToSlip, setLocalStorageItems, registeredBets, setRegisteredBets }) {
  const [responseMessage, setResponseMessage] = useState('');
  const [slipObjects, setSlipObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem('access_token');
  const [totalOdds, setTotalOdds] = useState(0);
  const [stakeAmount, setStakeAmount] = useState(0)
  const [pWin, setPWin] = useState(0)
  

  useEffect(() => {
    localStorageItems = localStorageItems.filter(obj2 =>
      data.some(obj1 => obj1.id === parseInt(obj2.id))
    );

  }, [data, localStorageItems])

  useEffect(() => {
    const itemsId = localStorageItems.map(item => parseInt(item.id));
    let matchingObjects = data.filter(match => itemsId.includes(match.id));

    let filteredMatches = matchingObjects.map(match => {
      const { area, awayTeam, competition, homeTeam, id, utcDate, odds } = match;
      return { awayTeam, homeTeam, id, utcDate, odds, competition };
    });

    const mappedArray = localStorageItems.map(item1 => {
    const matchingItem = filteredMatches.find(item2 => item2.id === parseInt(item1.id));
      if (matchingItem) {
        return {
          ...item1,
          ...matchingItem
        };
      } else {
        return item1;
      }
    });
    
    setSlipObjects(mappedArray);
    setLoading(false)

  }, [localStorageItems, data]);

  useEffect(() => {
    if (slipObjects.length) {
      const allSelectedOdds = slipObjects.map(item => item.odds && item.odds[item.className])
      if (slipObjects.length) {
        let productOdd = allSelectedOdds.reduce((a,b) => a + b)
        productOdd ? productOdd = parseFloat(productOdd.toFixed(2)) : ''
        setTotalOdds(productOdd)
      }
    }
  }, [slipObjects, totalOdds])
  
  const stakeValue = (event) => {
    const stakeInput = event.target;
    const stakeValue = parseInt(stakeInput.value);
    setStakeAmount(stakeValue);
    const potententialWinnings =  stakeValue * totalOdds 
    setPWin(potententialWinnings)
  }

  const sendDataToBackend = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/odds', {
        slip: slipObjects, totalOdds, stakeAmount
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const responseData = response.data;
      setRegisteredBets(responseData.user_bets);
      setLocalStorageItems([])
    } catch (error) {
      console.error('Error sending data to backend:', error.message);
    }
  };

  useEffect(() => {
    console.log(data);
    console.log(registeredBets);
  }, [registeredBets])


  return (
    <>
      <div style={{display: localStorageItems.length === 0 && !registeredBets.length ? 'block' : 'none'}}>
        <Message
          header="You have no open bets"
        >
          Please make one or more selections in order to place bets
        </Message>
      </div>

      <div className='slip-holder p-3'
        style={{display: localStorageItems.length && !registeredBets.length ? 'block' : 'none'}}
      >
        <div className='slip-holder-container'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          slipObjects && slipObjects.map((slipItem, index) => (
            <div key={index} className='bet-match-info'>
              <div className='flex justify-between'>
                <div className='w-100'>
                  <h3 className='outcome'>{`${slipItem.className.charAt(0).toUpperCase()}${slipItem.className.slice(1)}`}</h3>
                  <div className='picked-teams flex'>
                    <small className='live'>Live </small>
                    <small className='teams'>
                      {slipItem.awayTeam && slipItem.awayTeam.name} vs {slipItem.awayTeam && slipItem.homeTeam.name}
                    </small>
                  </div>
                </div>
                <div className='remove-slip-item'>
                  <small className={slipItem.className} id={slipItem.id} onClick={addToSlip}>x</small>
                </div>
              </div>
              <div className='flex justify-between'>
                <small className='mkt'>{slipItem.competition && slipItem.competition.name}</small>
                <h3 className='odd'>{slipItem.odds && slipItem.odds[slipItem.className]}</h3>
              </div>
              <div className='hr'></div>
            </div>
          ))
        )}
        </div>
        <div>
          <div className='flex justify-between py-4'>
            <h3>Total Stake</h3>
            <div className='input-div flex justify-between'>
              <span>NGN</span>
              <input onChange={stakeValue} type="number" min="100" />
            </div>
          </div>
          <div className='flex justify-between'>
            <h3>Odds</h3>
            <h3>{totalOdds}</h3>
          </div>
          <br />
          <div className='flex justify-between'>
            <h3>Potential Win</h3>
            <h3>₦{pWin ? pWin: ''}</h3>
          </div>
          <div 
            className='submit-slip'
            onClick={sendDataToBackend}
          >Place Bet</div>
        </div>

      </div>

      <div className='slip-holder slip-holder2 p-1'
        style={{display: !localStorageItems.length && registeredBets.length ? 'block' : 'none'}}
      >
        <div className='slip-holder-container'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            registeredBets && registeredBets.map((slipItem, index) => (
              slipItem.slip.length === 1 ? (
                <div key={index} className='bet-match-info2'>
                  <div className='flex justify-between'>
                    <div className='w-100'>
                      <h3 className='outcome'>{slipItem.slip && `${slipItem.slip[0].className.charAt(0).toUpperCase()}${slipItem.slip[0].className.slice(1)}`}</h3>
                      <div className='picked-teams flex'>
                        <small className='live'>Live </small>
                        <small className='teams'>
                          {slipItem.slip && slipItem.slip[0].awayTeam.name} vs {slipItem && slipItem.slip[0].homeTeam.name}
                        </small>
                      </div>
                    </div>
                    <div className='remove-slip-item'>
                      <small className={slipItem.slip.className}>1x2</small>
                    </div>
                  </div>
                  <div className='flex justify-between'>
                    <small className='mkt'>stake: {slipItem && slipItem.stakeAmount}</small>
                    <h3 className='odd'>{slipItem && slipItem.totalOdds}</h3>
                  </div>
                  {/* <div className='hr'></div> */}
                </div>
              ) : slipItem.slip.length > 1 ? (
                <div key={index} className='bet-match-info2'>
                  <div className='flex justify-between'>
                    <div className='w-100'>
                      <h3 className='outcome'>Multiple</h3>
                      <div className='picked-teams flex'>
                        <small className='live'>Live </small>
                        <small className='teams'>
                          {slipItem.slip && slipItem.slip[0].awayTeam.name} vs {slipItem && slipItem.slip[0].homeTeam.name}
                        </small>
                      </div>
                    </div>
                    <div className='remove-slip-item'>
                      <small className={slipItem.slip.className}><FontAwesomeIcon icon="fa-angle-down" /></small>
                    </div>
                  </div>
                  <div className='flex justify-between'>
                    <small className='mkt'>stake: {slipItem && slipItem.stakeAmount}</small>
                    <h3 className='odd'>Total odds: {slipItem && slipItem.totalOdds}</h3>
                  </div>
                  {/* <div className='hr'></div> */}
                  <div className='bg p-2'>
                    <div className='flex justify-between'>
                      <div className='w-100'>
                        <h3 className='outcome'>Multiple</h3>
                        <div className='picked-teams flex'>
                          <small className='live'>Live </small>
                          <small className='teams'>
                            {slipItem.slip && slipItem.slip[0].awayTeam.name} vs {slipItem && slipItem.slip[0].homeTeam.name}
                          </small>
                        </div>
                      </div>
                      <div className='remove-slip-item'>
                        <small className={slipItem.slip.className}><FontAwesomeIcon icon="fa-angle-down" /></small>
                      </div>
                    </div>
                    <div className='flex justify-between'>
                      <small className='mkt'>stake: {slipItem && slipItem.stakeAmount}</small>
                      <h3 className='odd'>Total odds: {slipItem && slipItem.totalOdds}</h3>
                    </div>
                  </div>
                   
                  {slipItem.slip.map((item, indexx) => (
                    <div style={{display: 'none'}} key={indexx}>
                      <br />
                      <div className='flex justify-between'>
                        <div className='w-100'>
                          <h3 className='outcome'>{`${item.className.charAt(0).toUpperCase()}${item.className.slice(1)}`}</h3>
                          <div className='picked-teams flex'>
                            <small className='live'>Live </small>
                            <small className='teams'>
                              {item.awayTeam && item.awayTeam.name} vs {item.awayTeam && item.homeTeam.name}
                            </small>
                          </div>
                        </div>
                        <div className='remove-slip-item'>
                          {/* <small className={item.className}>x</small> */}
                        </div>
                      </div>
                      <div className='flex justify-between'>
                        <small className='mkt'>{item.competition && item.competition.name}</small>
                        <h3 className='odd'>{item.odds && item.odds[item.className]}</h3>
                      </div>
                      <div className='hr'></div>
                    </div>
                  ))}
                </div>
              ) : null
            ))
          )}
        </div> 
      </div>
    </>
  );
}

export default BetSlip;
