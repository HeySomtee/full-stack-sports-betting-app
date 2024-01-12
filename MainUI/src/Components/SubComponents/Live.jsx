import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';

library.add(fas);


function Live({ data, setData }) {
  return (
    <>
      <section className='match-display'>
        <div>
          <span><b className='text-white text-lg'>Live</b> Matches</span>
        </div>
        <br />
        <div className='live-match-container flex'> 
          {data.map((match, index) => (
            <div key={index} className="live-match-display p-2" id={`live-match-display${index}`}>
              <div className='match-status flex justify-between'>
                <span className='live'>Live</span> 
                <span><FontAwesomeIcon icon={faStar} /></span>
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
                <div id={`${match.id}-home`} >
                  <small>1</small>
                  <small>{match.odds.homeWin}</small>
                </div>
                <div id={`${match.id}-draw`} >
                  <small>x</small>
                  <small>{match.odds.draw}</small>
                </div>
                <div id={`${match.id}-away`} >
                  <small>2</small>
                  <small>{match.odds.awayWin}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Live;
