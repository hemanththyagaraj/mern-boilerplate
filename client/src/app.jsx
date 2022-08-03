/* eslint-disable no-undef */
import React from 'react';
import Dashboard from './dashboard';
import './app.css';
import Api from './apis/api';

function App() {
  const handleClick = async () => {
    try {
      const res = await Api.signUp({
        name: 'hemanth',
        email: 'hemanththyagaraj@gmail.com',
        password: '!Hemanth@859',
        confirmPassword: '!Hemanth@859',
      });
      console.log(res, 'dataaaa');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>{process.env.REACT_APP_CLIENT_SERVER_PORT}</h1>
      <button type="button" onClick={handleClick}>Click me</button>
      <Dashboard />
    </div>
  );
}

export default App;
