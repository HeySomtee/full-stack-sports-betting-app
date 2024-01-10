import React, { useEffect, useState } from 'react'
import '../styles/left-side-bar.css'

function LeftSideBar() {
  return (
    <div>
      <div className='left-side-bar'>
        <input type="text" placeholder='search' className='p-2 bg-thin-grey' />
        <br />

        <div>
          <br />
          <h4 className='mb-4'><b>Navigation</b></h4> 
          <div className='items'>
            <div className='bg-primary-800'>Home</div>
            <div>Live</div>
            <div>Favourites</div>
          </div>
        </div>
        <br /> 

        <div>
          <h4 className='mb-4'><b>Sports</b></h4>
          <div  className='items'>
            <div>Football</div>
            <div>Tennis</div>
            <div>Basketball</div>
            <div>Volleyball</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default LeftSideBar