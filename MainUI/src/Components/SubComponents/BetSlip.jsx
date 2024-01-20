import React, { useEffect, useState } from 'react';
import Message from './Message';
import axios from 'axios';

function BetSlip({ localStorageItems, data, setData, addToSlip}) {
  const [responseMessage, setResponseMessage] = useState('');
  const [slipObjects, setSlipObjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const itemsId = localStorageItems.map(item => parseInt(item.id));
    let matchingObjects = data.filter(match => itemsId.includes(match.id));
    const mappedArray = localStorageItems.map(item1 => {
      const matchingItem = matchingObjects.find(item2 => item2.id === parseInt(item1.id));
      if (matchingItem) {
        return {
          ...item1,
          ...matchingItem
        };
      } else {
        console.warn(`No matching item found for id ${item1.id}`);
        return item1;
      }
    });
    
    setSlipObjects(mappedArray);
    setLoading(false);

  }, [localStorageItems, data]);

  useEffect(() => {
    console.log(slipObjects);
  }, [slipObjects]);

  const sendDataToBackend = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/odds', {
        key: slipObjects
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
      <div style={{display: localStorageItems.length === 0 ? 'block' : 'none'}}>
        <Message
          header="You have no open bets"
        >
          Please make one or more selections in order to place bets
        </Message>
      </div>

      <div className='slip-holder p-3'
        style={{display: localStorageItems.length === 0 ? 'none' : 'block'}}
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
          <div 
            className='submit-slip'
            onClick={sendDataToBackend}
          >Place Bet</div>
        </div>

      </div>
    </>
  );
}

export default BetSlip;
