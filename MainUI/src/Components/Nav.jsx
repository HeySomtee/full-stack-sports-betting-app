import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css'

function Nav() {
  return (
    <div className='nav-bar p-4 flex justify-between'>
      <div className='flex sub-1 p-2'>
        <span>[ LOGO_HERE ]</span>
        <span className='text-white'><b>Sports</b></span>
        <span>Live</span>
        <span>****</span>
        <span>Contacts</span>
      </div>

      <div className='flex call-to-action justify-between'>
        <span className='btn'><span className='text-primary-800'>₦</span>10000.00</span>
        <Link to="/login" className='btn aux'>LOG IN</Link>
        {/* <Link to="/signup" className='btn bg-primary-800 '>SIGN UP</Link> */}
      </div>
    </div>
  );
}

export default Nav;
