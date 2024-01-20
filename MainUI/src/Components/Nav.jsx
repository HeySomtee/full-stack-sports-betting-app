import React from 'react';
import { Link } from 'react-router-dom';

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

      <div className='flex call-to-action justify-around'>
        <span className='btn p-2'>ENG</span>
        <Link to="/login" className='btn aux'>LOG IN</Link>
        <Link to="/signup" className='btn bg-primary-800 '>SIGN UP</Link>
      </div>
    </div>
  );
}

export default Nav;
