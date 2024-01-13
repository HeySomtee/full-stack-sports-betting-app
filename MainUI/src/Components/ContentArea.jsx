import React, { useEffect, useState, useRef } from 'react'
import '../styles/content-area.css'
import Live from './SubComponents/Live';
import Upcoming from './SubComponents/Upcoming';

function ContentArea({ data, setData }) {

  return (
    <div className='main-content'>

      {/* <div className='poster bg-primary-800 flex justify-left'>
        <div className='poster-text'>
          <h2><b>SIGN UP AND GET </b></h2>
          <p><b>100% Welcome Bonus</b></p>
        </div>
      </div>  */}
      <br />
     <Live data={data} setData={setData}/>
      <br /> 
      <Upcoming data={data} setData={setData}/>
    </div>
  )
}

export default ContentArea