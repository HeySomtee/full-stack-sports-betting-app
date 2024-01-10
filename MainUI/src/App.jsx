import React, { useEffect, useState } from 'react';
import './App.css';
import Nav from './Components/Nav'
import LeftSideBar from './Components/LeftSideBar'
import ContentArea from './Components/ContentArea'
import RightSideBar from './Components/RightSideBar'


function App() {
  
  return (
    <>
      <Nav/>
      {/* <br /> */}
      <div className='flex justify-around w-screen p-5'>
        <LeftSideBar />
        <ContentArea />
        <RightSideBar />
      </div>
     
    </>
  );
}

export default App;
