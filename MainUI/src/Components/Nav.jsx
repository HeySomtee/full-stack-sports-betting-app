import React, { useEffect, useState } from 'react'
import '../styles/nav.css'

function Nav() {
  return (
    <div>
      <div className='nav-bar p-4 flex justify-between'>
        <div className='flex sub-1 p-2'>
          <span>[ LOGO_HERE ]</span>
          <span className='text-white'><b>Sports</b></span>
          <span>Live</span>
          <span>****</span>
          <span>Contacts</span>
        </div>

        <div
          className='flex call-to-action justify-around'
        >
          <span className='btn p-2'>ENG</span>
          <button className='btn aux'>LOG IN</button>
          <button className='btn bg-primary-800 '>SIGN UP</button>
        </div>
      </div>
    </div>

     
  )
}

export default Nav