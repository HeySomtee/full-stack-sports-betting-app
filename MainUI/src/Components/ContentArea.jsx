import React, { useEffect, useState, useRef } from 'react'
import '../styles/content-area.css'
import heroImage from '../assets/hero-image.png'

function ContentArea() {
  const containerRef = useRef();
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

      <div className='poster bg-primary-800 flex justify-left'>
        <div className='poster-text'>
          <h2><b>SIGN UP AND GET </b></h2>
          <p><b>100% Welcome Bonus</b></p>
        </div>
        {/* <div className='hero-image-div'><img className='hero-image' src={heroImage} alt="" /></div> */}
      </div> 
      <br />
     

      <section className='match-display'>
        <div>
          <span><b className='text-white text-lg'>Live</b> Matches</span>
        </div>
        <br />
        <div className='live-match-container flex' ref={containerRef}> 
          {data.map((match, index) => (
            <div key={index} className="live-match-display p-2" id={`live-match-display${index}`}>
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
        {/* <div className='live-match-carousel p-3 flex'>
          {carouselButtons}
        </div> */}
      </section>

      <br />
      <section>
        <div>
          <h2><b className='text-white text-lg'>Football</b> Upcoming</h2>
        </div>

        <br />


        <div className='upcoming-match-display'>
          <div className='upc-header p-2 flex justify-between'>

            <div className='upc-match-info'>
              <div className='upc-date'>Date</div>
              <div className='upc-status'>Status</div>
            </div>

            <div className='upc-odds-header'>
              <div className='inner-upc-odds-header flex'>
                <div>Home</div>
                <div>Draw</div>
                <div>Away</div>
              </div>
            </div>

            <div className='markets flex'>
              <div>COM</div>
            </div>
          </div>

          {data.map((match, index) => (
            <div key={index} className='upc-fixtures-display p-3 flex justify-between'>
              <div className='upc-match-info flex'>
                <div>
                  <b className='text-white'>15:00</b>
                  <br />
                  TODAY
                </div>
                <div className='match-status-display grid place-content-center'>[icon]</div>
              </div>

              <div className='upc-odds-header flex justify-between v-center'>

                <div className='upc-home-team flex'>
                  <b className='text-white'>{match.homeTeam.tla}</b>
                  <img src={match.homeTeam.crest} alt="" />
                </div>

                <div className='inner-upc-odds-header upc-odds-display text-white'>
                  <div>{match.odds.homeWin}</div>
                  <div>{match.odds.draw}</div>
                  <div>{match.odds.awayWin}</div>
                </div>

                <div className='upc-away-team flex'>
                  <img src={match.awayTeam.crest} alt="" />
                  <b className='text-white'>{match.awayTeam.tla}</b>
                </div>

              </div>

              <div className='markets flex justify-between'>
                
                {/* <div>{match.competition.code}</div> */} {/* uncomment to add competiton code alongside emblem in the 'COM' section */}
                <div className='mkt-img'><img src={match.competition.emblem} alt="" /></div>
              </div>

            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ContentArea