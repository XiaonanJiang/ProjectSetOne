import React, { useState } from 'react';
import deleteSession from '../services/deleteSession';

const UserHomePage = ({ username, onLogout, onPageChange }) => {

    const [errorMessage, setErrorMessage] = useState('');

    const toUserAccountInformation = () => {
        onPageChange('userAccountInformation');
    };
    const toUserMall = () => {
        onPageChange('userMall');
    };
    const toUserMessages = () => {
        onPageChange('userMessages');
    };
    const toUserWallet = () => {
        onPageChange('userWallet');
    };
  const handleLogout = ()=>{
    deleteSession().then(username => {
      onLogout();
    }).catch(error => {
      setErrorMessage(error.error); 
    });
  };

  return (
        <div>
        <h2>Welcome, {username}!</h2>
        <button onClick={toUserAccountInformation}>Account Information</button>
        <button onClick={toUserMall}>Mall</button>
        <button onClick={toUserMessages}>Message Center</button>
        <button onClick={toUserWallet}>Account Financial</button>
        {errorMessage && <p className="hint">{errorMessage}</p>}
        <button onClick={handleLogout}>Log Out</button>
      </div>
  );
};

export default UserHomePage;

