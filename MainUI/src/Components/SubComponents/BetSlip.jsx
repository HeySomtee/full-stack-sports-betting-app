import React, { useEffect} from 'react';
import Message from './Message';

function BetSlip({ localStorageItems }) {

  useEffect(() => {
    console.log(localStorageItems + " " + "BetSlip Component");
  }, [localStorageItems])
  
  return (
    <>
      <div style={{display: localStorageItems.length === 0 ? 'block' : 'none'}}>
        <Message
          header="What is cash out?"
        >
          Please make one or more selections in order to place bets
        </Message>
      </div>
    </>
  );
}

export default BetSlip;
