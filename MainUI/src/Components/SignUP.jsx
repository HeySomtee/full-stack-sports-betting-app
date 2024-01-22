import { React, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';


function SignUP() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(0)
  const [statusVal, setStatusVal] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const navigate = useNavigate();
  const notify = () => toast(`${responseMessage}`);
  const handleLogin = async () => {
    // Make a request to your backend with the form data
    try {
      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();
      const responseStatus = response.status;
      setStatus(responseStatus)
      setResponseMessage(responseData.res);
      console.log(responseData.res);

      if (!response.ok) {
        throw new Error('Login failed');
      }
      notify()
      
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };
  return (
    <div className="login-body">
      <ToastContainer
          position="top-left"
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
    <div className='form-container'>
      <div className='form-div'>
        <h1 className='text-lg'><b>Sign Up</b></h1>
        <small>Have an account?  
          <span 
            style={{
              textDecoration: 'underline',
            }}
            onClick={() => {navigate('/login')}}
            >
              login
          </span>
        </small>
        <br /> <br />
        <form>
          <label htmlFor="email"><h3>Email Address</h3></label>
          <input className='input' type="text" name='email' onChange={(e) => {setEmail(e.target.value)}} />
          <br /> <br />
          <label htmlFor="password"><h3>Password</h3></label>
          <input className='input' type="text" name='password'  onChange={(e) => {setPassword(e.target.value)}}/>
        </form>
        <div className='flex justify-between f'>
          <input className='check' type="checkbox" name="" id="check" /> <span>Remember me</span>
        </div>

          <p
            className='p-4 text-green-500 flex'
            style={{
              color: status === 222 ? 'red' : ''
            }}
          >
            {responseMessage} 
            <span style={{
              color: '#fff',
              textDecoration: 'underline',
              display: status === 222 ? 'block' : 'none'
            }} onClick={() => {navigate('/login')}}
            >
              login?
            </span>
          </p> 
        <button className='login-btn' onClick={handleLogin}>
          <span
            style={{
              display: statusVal ? 'none' : 'block'
            }}
            onClick={() => {setStatusVal(true)}}
          >
            Sign Up 
          </span>
          <span className=''>
            <span
             className='Oauth-preloader'
             style={{
               display: statusVal ? 'block' : 'none',
               animationName: 'rotate'
             }}
            ><FontAwesomeIcon icon="fa-arrows-rotate" /></span>
          </span>
        </button>
      </div>
      
    </div>
  </div>
  )
}

export default SignUP