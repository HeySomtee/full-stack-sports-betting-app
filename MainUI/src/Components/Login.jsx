import React from 'react'
import '../styles/login.css'

function Login() {
  return (
    <div className="login-body">
      <div className='form-container'>
        <div className='form-div'>
          <h1 className='text-lg'><b>Login</b></h1>
          <small>Don't have an account yet? <a href="#">sign-up</a></small>
          <br /> <br />
          <form action="">
            <label htmlFor="email"><h3>Email Address</h3></label>
            <input className='input' type="text" name='email' />
            <br /> <br />
            <label htmlFor="password"><h3>Password</h3></label>
          <input className='input' type="text" name='password'/>
          </form>
          <br /><br />
          <div className='flex justify-between f'>
            <input className='check' type="checkbox" name="" id="check" /> <span>Remember me</span>
          </div>

          <br />
          <button className='login-btn'>Login </button>
        </div>
        <div className='form-slide-show p-3'>
          {/* */}
        </div>
      </div>
    </div>
  )
}

export default Login