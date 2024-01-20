import React from 'react'
import '../styles/login.css'
// import AliceCarousel from 'react-alice-carousel';
// import 'react-alice-carousel/lib/alice-carousel.css';

// const handleDragStart = (e) => e.preventDefault();

// const items = [
//   <img src="https://images.pexels.com/photos/3781312/pexels-photo-3781312.jpeg?auto=compress&cs=tinysrgb&w=600" onDragStart={handleDragStart} role="presentation" />,
//   <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
//   <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
// ];

function Login() {
  return (
    <div className="login-body">
      <div className='form-container'>
        <div className='form-div'>
          <h1 className='text-lg'><b>Login</b></h1>
          <small>Don't have an account yet? <a href="#">sign-up</a></small>
          <br /> <br />
          <h3>Email Address</h3>
          <input className='input' type="text" />
          <br /> <br />
          <h3>Password</h3>
          <input className='input' type="text" />
          <br /><br />
          <div className='flex justify-between f'>
            <input className='check' type="checkbox" name="" id="check" /> <span>Remember me</span>
          </div>

          <br />
          <button className='login-btn'>Login</button>
        </div>
        <div className='form-slide-show p-3'>
          {/* <AliceCarousel mouseTracking items={items} /> */}
        </div>
      </div>
    </div>
  )
}

export default Login