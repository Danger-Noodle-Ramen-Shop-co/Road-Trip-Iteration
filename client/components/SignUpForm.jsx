import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  //React state to get auth info
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //State to check if the username is already in use
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [fieldsFilled, setFieldsFilled] = useState(true);
  const [errorMsgShow, setErrorMsgShow] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsUsernameTaken(false);
    setFieldsFilled(true);
    setErrorMsgShow(false);

    const formData = { username, password };
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, 'signup response');
        if (data.success) {
          navigate('/');
        } else {
          if (data.message === 'User already exists') {
            setIsUsernameTaken(true);
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
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {/* May not need states for setUsername and setPassword, get info on form submit */}
      <form onSubmit={handleSignUp}>
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
        <button type='submit'>Sign Up</button>
      </form>
      {isUsernameTaken && <p>Username is already taken</p>}
      {!fieldsFilled && <p>Please fill all fields</p>}
      {errorMsgShow && <p>An error occurred. Please try again.</p>}
      <Link to='/'>Back to Login</Link>
    </div>
  );
};

export default SignUpForm;
