import React from 'react';
import Message from './Message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

library.add(fas);


function Live({ data, setData, resultCount }) {
  const notify = () => toast.error("can't bet on live matches");
  const hasMatches = data.some(match => match.status === 'IN_PLAY' || match.status === 'PAUSED' );
  return (
    <>
      <section className='match-display'>
        <div>
          <span><b className='text-white text-lg'>Live</b> Matches</span>
        </div>
        <br />
        <div className='live-match-container flex'> 
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition: Bounce
        />
        {hasMatches ? (
      data.map((match, index) => (
        match.status === 'IN_PLAY' || match.status === 'PAUSED' ? (
          <div key={index} className="live-match-display p-2" id={`live-match-display${index}`}>
            <div className='match-status flex justify-between'>
              <span className='live'>{match.status === 'PAUSED' ? 'Break' : 'Live'}</span> 
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
                <span>{match.score.fullTime.away}</span>
              </div>
            </div>

            <br />

            <div className='odds-container flex justify-between'>
              <div 
                id={match.id} 
                className='1'
                onClick={notify}
                // style={{
                //   backgroundColor: localStorageItems.some(item => item.className === '1' && item.id === `${match.id}`) ? '#144fce' : '#52505069'
                // }}
              >
                <small>1</small>
                <small>{match.odds.homeWin}</small>
              </div>

              <div 
                id={match.id} 
                className='x'
                onClick={notify}
                // style={{
                //   backgroundColor: localStorageItems.some(item => item.className === 'x' && item.id === `${match.id}`) ? '#144fce' : '#52505069'
                // }}
              >
                <small>x</small>
                <small>{match.odds.draw}</small>
              </div>

              <div 
                id={match.id} 
                className='2'
                onClick={notify}
                // style={{
                //   backgroundColor: localStorageItems.some(item => item.className === '2' && item.id === `${match.id}`) ? '#144fce' : '#52505069'
                // }}
              >
                <small>2</small>
                <small>{match.odds.awayWin}</small>
              </div>
            </div>
          </div>
        ) : null
      ))
    ) : resultCount === 0 ? (
        <Message header={'check back tomorrow'}>
          There are no live matches at the moment
        </Message>
    ) : (
        <Message header={'check back later'}>
          There are no live matches now
        </Message>
    )}  
          

        </div>
      </section>
    </>
  );
}

export default Live;
