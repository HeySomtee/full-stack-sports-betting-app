import React, { useEffect, useState } from 'react';
import './App.css';
import Nav from './Components/Nav'
import LeftSideBar from './Components/LeftSideBar'
import ContentArea from './Components/ContentArea'
import RightSideBar from './Components/RightSideBar'
import Test from './Components/Test';


function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/data/');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        processData(jsonData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const processData  = (newData) => {
    var Matches = newData.matches
    setData(Matches)
    console.log(Matches);
  } 

  return (
    <>

      <Nav/>
      <br />
      <div className='flex justify-around w-screen py-2'>
        <LeftSideBar />
        <ContentArea data={data} setData={setData}/>
        <RightSideBar data={data} setData={setData}/>
      </div>
     
    </>
  );
}

export default App;
