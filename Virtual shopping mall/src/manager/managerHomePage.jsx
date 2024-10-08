import React, { useState } from 'react';
import deleteManagerSession from '../services/deleteManager_session';

const ManagerHomePage = ({ username, onLogout, onPageChange }) => {

    const [errorMessage, setErrorMessage] = useState('');

    const toOrderManagement = () => {
        onPageChange('orderManagement');
    };
    const toProductManagement = () => {
        onPageChange('productManagement');
    };
    const toUserManagement = () => {
        onPageChange('userManagement');
    };
  const handleLogout = ()=>{
    deleteManagerSession().then(username => {
      onLogout();
    }).catch(error => {
      setErrorMessage(error.error); 
    });
  };

  return (
        <div>
        <h2>Welcome, {username}! You can manage orders and products, and communicate with any customer</h2>
        <button onClick={toOrderManagement}>Order Management</button>
        <button onClick={toProductManagement}>Product Management</button>
        <button onClick={toUserManagement}>User Management</button>
        {errorMessage && <p className="hint">{errorMessage}</p>}
        <button onClick={handleLogout}>Log Out</button>
      </div>
  );
};

export default ManagerHomePage;

