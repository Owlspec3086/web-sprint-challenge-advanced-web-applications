import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const { push } = useHistory();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const loginSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("http://localhost:5000/api/login", credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        push('/bubbles');
      })
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={loginSubmit}>
      <h1>Welcome to the Bubble App!</h1>
      <input
        type='text'
        name='username'
        value={credentials.username}
        onChange={handleChange}
      />
      <input
        type='password'
        name='password'
        value={credentials.password}
        onChange={handleChange}
      />
      <button>Login</button>
    </form>
  );
};

export default Login;
