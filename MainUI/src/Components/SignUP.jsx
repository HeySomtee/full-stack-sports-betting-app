import React from 'react'
import '../styles/login.css'

function SignUP() {
  return (
    <div className="login-body">
    <div className='form-container'>
      <div className='form-div'>
        <h1 className='text-lg'><b>Sign Up</b></h1>
        <small>Have an account? <a href="#">login</a></small>
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
        <button className='login-btn'>Sign Up</button>
      </div>
      <div className='form-slide-show p-3'>
        {/* <AliceCarousel mouseTracking items={items} /> */}
      </div>
    </div>
  </div>
  )
}

export default SignUP