import React, { useEffect, useState } from 'react'
import Message from './SubComponents/Message'
import '../styles/right-side-bar.css'
import { useLocalStorageSelections } from './SubComponents/utils'

function RightSideBar() {
  const [slipCount, setSlipCount] = useState(0)
  const [betCount, setbetCount] = useState(0)
  const [isactive, setIsActive] = useState('bet-slip')

  const toggleActive = (param) => {
    setIsActive(param)
  }

  return (
    <div className='right-side-bar'>
      <div className='right-side-bar-header flex justify-between'>
        <span 
          className={isactive === 'bet-slip' ? 'active' : '' }
          onClick={() => toggleActive('bet-slip')}
        >Bet Slip {slipCount}</span>

        <span 
        className={isactive === 'bet-count'? 'active' : '' }
        onClick={ () => toggleActive('bet-count')}
        >Bet History {betCount}</span>
      </div>
      <br />

      <div className='right-side-content'>
        <Message header="Your betslip is empty">
          Please make one or more selections in order to place bets
        </Message>


        {/* stack bet slips from backend */}
      </div>
    </div>
  )
}

export default RightSideBar