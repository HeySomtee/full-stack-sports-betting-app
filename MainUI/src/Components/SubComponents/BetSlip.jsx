import React, { useEffect, useState } from 'react';
import Message from './Message';
import axios from 'axios';

function BetSlip({ localStorageItems, data, setData, addToSlip, setLocalStorageItems, registeredBets, setRegisteredBets }) {
  const [responseMessage, setResponseMessage] = useState('');
  const [slipObjects, setSlipObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem('access_token');
  const [totalOdds, setTotalOdds] = useState(0);
  

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
      return { awayTeam, homeTeam, id, utcDate, odds };
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

  const sendDataToBackend = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/odds', {
        slip: slipObjects, totalOdds
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
                  <small className={slipItem.className} id={slipItem.id} onClick={addToSlip}>X</small>
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
              <input type="number" />
            </div>
          </div>
          <div className='flex justify-between'>
            <h3>Odds</h3>
            <h3>{totalOdds}</h3>
          </div>
          <br />
          <div className='flex justify-between'>
            <h3>Potential Win</h3>
            <h3>0</h3>
          </div>
          <div 
            className='submit-slip'
            onClick={sendDataToBackend}
          >Place Bet</div>
        </div>

      </div>

      <div className='slip-holder slip-holder2 p-3'
        style={{display: !localStorageItems.length && registeredBets.length ? 'block' : 'none'}}
      >
        <div className='slip-holder-container'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            registeredBets && registeredBets.map((slipItem, index) => (
              slipItem.slip.length === 1 ? (
                <div key={index} className='bet-match-info'>
                <div className='flex justify-between'>
                  <div className='w-100'>
                    {/* <h3 className='outcome'>{slipItem.slip && `${slipItem.slip.className.charAt(0).toUpperCase()}${slipItem.slip.className.slice(1)}`}</h3> */}
                    <div className='picked-teams flex'>
                      <small className='live'>Live </small>
                      <small className='teams'>
                        {slipItem.slip.awayTeam && slipItem.slip.awayTeam.name} vs {slipItem.slip.awayTeam && slipItem.slip.homeTeam.name}
                      </small>
                    </div>
                  </div>
                  {/* <div className='remove-slip-item'>
                    <small className={slipItem.slip.className} id={slipItem.slip.id} onClick={addToSlip}>X</small>
                  </div> */}
                </div>
                <div className='flex justify-between'>
                  {/* <small className='mkt'>{slipItem.slip.competition && slipItem.competition.name}</small> */}
                  <h3 className='odd'>{slipItem.slip.odds && slipItem.slip.odds[slipItem.slip.className]}</h3>
                </div>
                <div className='hr'></div>
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
