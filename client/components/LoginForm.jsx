//page to navigate sign up and log in
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPwdWrong, setIsPwdWrong] = useState(false);
  const [fieldsFilled, setFieldsFilled] = useState(true);
  const [errorMsgShow, setErrorMsgShow] = useState(false);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    setIsPwdWrong(false);
    setFieldsFilled(true);
    setErrorMsgShow(false);
    e.preventDefault();
    const formData = {
      username,
      password,
    };
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, 'success logged in');
        if (data.success) {
          navigate('/mainPage');
        } else {
          if (data.message === 'Invalid information') {
            setIsPwdWrong(true);
          } else if (
            data.message ===
            'missing data: cannot find email or password in req.body'
          ) {
            setFieldsFilled(false);
          } else {
            setErrorMsgShow(true);
          }
        }
      })
      .catch((error) => {
        setErrorMsgShow(true);
        console.error('Error in login api:', error);
      });
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  function handleBypass() {
    navigate('/mainPage');
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      {isPwdWrong && <p>Incorrect information</p>}
      {!fieldsFilled && <p>Please fill all fields</p>}
      {errorMsgShow && <p>An error occurred. Please try again.</p>}
      <button onClick={handleSignUpClick}>Sign Up</button>
      <button onClick={handleBypass}>BYPASS LOGIN</button>
    </div>
  );
};

export default LoginForm;
