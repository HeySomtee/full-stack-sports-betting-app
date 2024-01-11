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
    console.log(Matches.length);
  } 

  return (
    <div className='main-content'>

      {/* <div className='poster bg-primary-800 flex justify-around'>
        <div className='poster-text'>
          <h2>SIGN UP AND GET </h2>
          <p>100% Welcome Bonus</p>
        </div>
        <div className='hero-image-div'><img className='hero-image' src={heroImage} alt="" /></div>
      </div> 
      <br />
      */}

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
              <div>+Markets</div>
            </div>
          </div>


          <div className='upc-fixtures-display p-3 flex justify-between'>
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
                <b className='text-white'>Chelsea</b>
                <img src="https://crests.football-data.org/61.png" alt="" />
              </div>

              <div className='inner-upc-odds-header upc-odds-display'>
                <div>1.72</div>
                <div>3.40</div>
                <div>2.01</div>
              </div>

              <div className='upc-away-team flex'>
                <img src="https://crests.football-data.org/57.png" alt="" />
                <b className='text-white'>Arsenal</b>
              </div>

            </div>

            <div className='markets grid place-content-center'>
              <div>+140</div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default ContentArea