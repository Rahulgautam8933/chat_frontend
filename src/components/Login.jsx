import React, { useState } from 'react';
import { noTokenPostRequest } from '../helper/Helper';
import useCookie from '../helper/cookies';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setCookie, getCookie } = useCookie();

  const handleLogin = (e) => {
    e.preventDefault();
    // You can add the logic to handle login here
    if (!username || !password) {
      setError('Both fields are required!');
    } else {
      setError('');
      noTokenPostRequest({
        url:`users/loginUser`,
        cred:{
            username, password
        }
      }).then((res)=>{
        console.log(res?.data?.data);
        setCookie("chat-token", res?.data?.data?.accessToken, 30);
        window.location.href = `/`
      }).catch((error)=>{
        console.log(error);
      })
      console.log('Logged in', { username, password });
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className='card shadow-lg' style={{ maxWidth: '400px', width: '100%' }}>
        <div className='card-body'>
          <h5 className='card-title text-center mb-4'>Login</h5>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className='mb-3'>
              <label htmlFor='username' className='form-label'>Username</label>
              <input
                type='text'
                className='form-control'
                id='username'
                placeholder='Enter your username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>Password</label>
              <input
                type='password'
                className='form-control'
                id='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className='d-grid'>
              <button type='submit' className='btn btn-primary'>Login</button>
            </div>
          </form>

          <div className='text-center mt-3'>
            <small>
              Don't have an account? <a href='/signup'>Sign Up</a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
