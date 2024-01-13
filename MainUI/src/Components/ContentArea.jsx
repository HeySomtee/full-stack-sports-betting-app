import React, { useEffect, useState, useRef } from 'react'
import '../styles/content-area.css'
import Live from './SubComponents/Live';
import Upcoming from './SubComponents/Upcoming';

function ContentArea() {
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