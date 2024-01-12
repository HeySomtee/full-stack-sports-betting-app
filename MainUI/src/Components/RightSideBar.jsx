import React, { useEffect, useState } from 'react'
import '../styles/right-side-bar.css'

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
        <div className='flex'>
          <div className='prompt-message p-4'>
            <h3 className='active'>Your betslip is empty</h3>
            <p>Please make one or more selections in order to place bets</p>
          </div>
        </div>


        {/* stack bet slips from backend */}
      </div>
    </div>
  )
}

export default RightSideBar