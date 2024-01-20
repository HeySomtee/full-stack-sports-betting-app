import React, { useEffect, useState } from 'react';
import './App.css';
import Nav from './Components/Nav'
import LeftSideBar from './Components/LeftSideBar'
import ContentArea from './Components/ContentArea'
import RightSideBar from './Components/RightSideBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import SignUP from './Components/SignUP';
import { useLocalStorageSelections } from './Components/SubComponents/utils';



function App() {
  const [data, setData] = useState([])
  const storageKey = 'slipSelections';
  const { localStorageItems, betSlip, addToSlip } = useLocalStorageSelections(storageKey, data);

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
  } 

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUP />} />
          {/* <br /> */}
          <Route
            path="/"
            element={
              <>
                <Nav />
                <br />
                <div className='flex justify-around w-screen py-2'>
                <LeftSideBar />
                <ContentArea data={data} setData={setData} localStorageItems={localStorageItems} addToSlip={addToSlip} />
                <RightSideBar data={data} setData={setData} localStorageItems={localStorageItems} addToSlip={addToSlip} betSlip={betSlip} />
              </div>
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
