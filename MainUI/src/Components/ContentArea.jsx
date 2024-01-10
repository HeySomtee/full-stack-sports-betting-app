import React, { useEffect, useState } from 'react'
import '../styles/content-area.css'
import heroImage from '../assets/hero-image.png'

function ContentArea() {
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
        <div className='live-match-container flex'>
          
        <div className="live-match-display p-2">
            <div className='match-status flex justify-between'>
              <span className='live'>Live</span> 
              <span>'45</span>
            </div>
            <div className='match-teams flex justify-between'>
              <div><img src="https://crests.football-data.org/65.png" alt="" /></div>
              <div className='text-white'><i className='i'>VS</i></div>
              <div><img src="https://crests.football-data.org/356.png" alt="" /></div>
            </div>

            <div className='match-range'>
              <small className='text-white'>2nd Half 67'</small>
              <div className='range-outer'><div className='range-inner'></div></div>
            </div>
            
            <div className='py-2'>
              <small className='dir'>Football / Englang Premier League</small>
            </div>
            {/* <br /> */}
            <div className='team-scores-text text-white'>
              <div className='home-team-text flex justify-between'>
                <span>Man City</span> 
                <span>2</span>
              </div>
              <div className='away-team-text flex justify-between'>
                <span>Everton</span>
                <span>0</span>
              </div>
            </div>

            <br />
            <div className='odds-container flex justify-between'>
              <div className=''>
                <small>1</small>
                <small>1.76</small>
              </div>
              <div className=''>
                <small>x</small>
                <small>1.49</small>
              </div>
              <div className=''>
                <small>2</small>
                <small>2.01</small>
              </div>
            </div>

          </div>

          <div className="live-match-display p-2">
            <div className='match-status flex justify-between'>
              <span className='live'>Live</span> 
              <span>'45</span>
            </div>
            <div className='match-teams flex justify-between'>
              <div><img src="https://crests.football-data.org/57.png" alt="" /></div>
              <div className='text-white'><i className='i'>VS</i></div>
              <div><img src="https://crests.football-data.org/563.png" alt="" /></div>
            </div>

            <div className='match-range'>
              <small className='text-white'>2nd Half 67'</small>
              <div className='range-outer'><div className='range-inner'></div></div>
            </div>
            
            <div className='py-2'>
              <small className='dir'>Football / Englang Premier League</small>
            </div>
            {/* <br /> */}
            <div className='team-scores-text text-white'>
              <div className='home-team-text flex justify-between'>
                <span>Arsenal</span> 
                <span>1</span>
              </div>
              <div className='away-team-text flex justify-between'>
                <span>West Ham</span>
                <span>2</span>
              </div>
            </div>

            <br />
            <div className='odds-container flex justify-between'>
              <div className=''>
                <small>1</small>
                <small>1.76</small>
              </div>
              <div className=''>
                <small>x</small>
                <small>1.49</small>
              </div>
              <div className=''>
                <small>2</small>
                <small>2.01</small>
              </div>
            </div>

          </div>

          <div className="live-match-display p-2">
            <div className='match-status flex justify-between'>
              <span className='live'>Live</span> 
              <span>'45</span>
            </div>
            <div className='match-teams flex justify-between'>
              <div><img src="https://crests.football-data.org/351.png" alt="" /></div>
              <div className='text-white'><i className='i'>VS</i></div>
              <div><img src=" https://crests.football-data.org/66.png" alt="" /></div>
            </div>

            <div className='match-range'>
              <small className='text-white'>2nd Half 67'</small>
              <div className='range-outer'><div className='range-inner'></div></div>
            </div>
            
            <div className='py-2'>
              <small className='dir'>Football / Englang Premier League</small>
            </div>
            {/* <br /> */}
            <div className='team-scores-text text-white'>
              <div className='home-team-text flex justify-between'>
                <span>Nottingham</span> 
                <span>1</span>
              </div>
              <div className='away-team-text flex justify-between'>
                <span>Man United</span>
                <span>2</span>
              </div>
            </div>

            <br />
            <div className='odds-container flex justify-between'>
              <div className=''>
                <small>1</small>
                <small>1.76</small>
              </div>
              <div className=''>
                <small>x</small>
                <small>1.49</small>
              </div>
              <div className=''>
                <small>2</small>
                <small>2.01</small>
              </div>
            </div>

          </div>
         
          <div className="live-match-display p-2">
            <div className='match-status flex justify-between'>
              <span className='live'>Live</span> 
              <span>'45</span>
            </div>
            <div className='match-teams flex justify-between'>
              <div><img src="https://crests.football-data.org/354.png" alt="" /></div>
              <div className='text-white'><i className='i'>VS</i></div>
              <div><img src="https://crests.football-data.org/402.png" alt="" /></div>
            </div>

            <div className='match-range'>
              <small className='text-white'>2nd Half 67'</small>
              <div className='range-outer'><div className='range-inner'></div></div>
            </div>
            
            <div className='py-2'>
              <small className='dir'>Football / Englang Premier League</small>
            </div>
            {/* <br /> */}
            <div className='team-scores-text text-white'>
              <div className='home-team-text flex justify-between'>
                <span>Crystal Palace</span> 
                <span>3</span>
              </div>
              <div className='away-team-text flex justify-between'>
                <span>Brentford</span>
                <span>1</span>
              </div>
            </div>

            <br />
            <div className='odds-container flex justify-between'>
              <div className=''>
                <small>1</small>
                <small>1.76</small>
              </div>
              <div className=''>
                <small>x</small>
                <small>1.49</small>
              </div>
              <div className=''>
                <small>2</small>
                <small>2.01</small>
              </div>
            </div>

          </div>

          <div className="live-match-display p-2">
            <div className='match-status flex justify-between'>
              <span className='live'>Live</span> 
              <span>'45</span>
            </div>
            <div className='match-teams flex justify-between'>
              <div><img src="https://crests.football-data.org/65.png" alt="" /></div>
              <div className='text-white'><i className='i'>VS</i></div>
              <div><img src="https://crests.football-data.org/356.png" alt="" /></div>
            </div>

            <div className='match-range'>
              <small className='text-white'>2nd Half 67'</small>
              <div className='range-outer'><div className='range-inner'></div></div>
            </div>
            
            <div className='py-2'>
              <small className='dir'>Football / Englang Premier League</small>
            </div>
            {/* <br /> */}
            <div className='team-scores-text text-white'>
              <div className='home-team-text flex justify-between'>
                <span>Man City</span> 
                <span>2</span>
              </div>
              <div className='away-team-text flex justify-between'>
                <span>Everton</span>
                <span>0</span>
              </div>
            </div>

            <br />
            <div className='odds-container flex justify-between'>
              <div className=''>
                <small>1</small>
                <small>1.76</small>
              </div>
              <div className=''>
                <small>x</small>
                <small>1.49</small>
              </div>
              <div className=''>
                <small>2</small>
                <small>2.01</small>
              </div>
            </div>

          </div>
          
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

export default ContentArea