import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';

library.add(fas);

function Upcoming({ data, setData }) {
  return (
    <>
      <section>
        <div>
          <h2><b className='text-white text-lg'>Football</b> Upcoming</h2>
        </div>

        <br />

        <div className='upcoming-match-display'>
          <div className='upc-header p-2 flex justify-between'>
            <div className='upc-match-info'>
              <div className='upc-date'>Date</div>
              <div className='upc-status'></div>
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

          <div className='scroll-area'>
            {data.map((match, index) => (
              <div key={index} className='upc-fixtures-display p-3 flex justify-between'>
                <div className='upc-match-info flex'>
                  <div>
                    <b className='text-white'>15:00</b>
                    <br />
                    TODAY
                  </div>
                  <div className='match-status-display grid place-content-center'>
                      <FontAwesomeIcon icon={faStar} />
                  </div>
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
                  {/* <div>{match.competition.code}</div> */} {/* uncomment to add competition code alongside emblem in the 'COM' section */}
                  <div className='mkt-img'><img src={match.competition.emblem} alt="" /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Upcoming;
