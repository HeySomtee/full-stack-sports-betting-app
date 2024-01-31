import React, { useEffect, useState } from 'react'
import '../styles/content-area.css'

function Test() {
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
        console.log(data);
    }


  return (
    <div className='main-content'>
        <section className='match-display'>
        <div>
          <span><b className='text-white text-lg'>Live</b> Matches</span>
        </div>
        <br />
        
        <div className='live-match-container flex'>
            {data.map((match, index) => (
                <div key={index} className="live-match-display p-2">
                <div className='match-status flex justify-between'>
                    <span className='live'>Live</span> 
                    <span>'45</span>
                </div>
                <div className='match-teams flex justify-between'>
                    <div><img src={match.homeTeam.crest} alt="" /></div>
                    <div className='text-white'><i className='i'>VS</i></div>
                    <div><img src={match.awayTeam.crest} alt="" /></div>
                </div>

                <div className='match-range'>
                    <small className='text-white'>2nd Half 67'</small>
                    <div className='range-outer'><div className='range-inner'></div></div>
                </div>
                
                <div className='py-2'>
                    <small className='dir'>{match.competition.name}</small>
                </div>

                <div className='team-scores-text text-white'>
                    <div className='home-team-text flex justify-between'>
                    <span>{match.homeTeam.shortName}</span> 
                    <span>{match.score.fullTime.home}</span>
                    </div>
                    <div className='away-team-text flex justify-between'>
                    <span>{match.awayTeam.shortName}</span>
                    <span>{match.score.fullTime.home}</span>
                    </div>
                </div>

                <br />

                <div className='odds-container flex justify-between'>
                    <div>
                    <small>1</small>
                    <small>{match.odds.homeWin}</small>
                    </div>
                    <div>
                    <small>x</small>
                    <small>{match.odds.draw}</small>
                    </div>
                    <div>
                    <small>2</small>
                    <small>{match.odds.awayWin}</small>
                    </div>
                </div>
                </div>
            ))}
        </div>
        <div className='live-match-carousel p-3 flex'>
          <div className='carousel-btn active'></div>
          <div className='carousel-btn inactive'></div>
          <div className='carousel-btn inactive'></div>
          <div className='carousel-btn inactive'></div>
        </div>    
        </section>
        <br />
      <section>
        <div>
          <span><b className='text-white text-lg'>Football</b> Upcoming</span>
        </div>
        <br />
        <div className='height-dummy'>

        </div>
      </section>    
    </div>
  )
}

export default Test