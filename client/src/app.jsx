/* eslint-disable no-undef */
import React from 'react';
import Dashboard from './dashboard';
import './app.css';
import Api from './apis/api';

function App() {
  const handleClick = async () => {
    try {
      await Api.signUp({
        name: 'hemanth',
        email: 'hemanththyagaraj@gmail.com',
        password: '!Hemanth@859',
        confirmPassword: '!Hemanth@859',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAllUsers = async () => {
    try {
      const response = await Api.getAllUsers();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await Api.logout();
      window.history.replaceState(null, '', '/logout');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>{process.env.REACT_APP_CLIENT_SERVER_PORT}</h1>
      <button type="button" onClick={handleClick}>Register</button>
      <button type="button" onClick={handleGetAllUsers}>Get all users</button>
      <button type="button" onClick={handleLogout}>Logout</button>
      <Dashboard />
    </div>
  );
}

export default App;
