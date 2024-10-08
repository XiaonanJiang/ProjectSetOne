import React, { useState } from 'react';
import createSession from '../services/creatSession';

function isValidUsername(username) {
    let isValid = true;
    isValid = isValid && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
}

const UserLogin = ({ onLogin , onPageChange}) => {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if(isValidUsername(username)) {
        if(username === 'dog'){
            setErrorMessage('Invalid username, Username cannot be dog');
        }else if(username === 'manager'){
            setErrorMessage('This username can only be used by the manager. Please go to the manager login page to log in.');
        }else{
            setErrorMessage('');
            createSession(username).then(result => {
              onLogin(result);
            }).catch(error => {
              setErrorMessage(error.error); 
            });
        }
    }else{
        setErrorMessage('Invalid characters, username consists of letters and numbers only');
    };
  }

  const handlePageChange = () => {
    onPageChange('managerLogin');
  }

  return (
        <div>
        <h2>Login</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        {errorMessage && <p className="hint">{errorMessage}</p>}
        <button onClick={handlePageChange}>Go to the manager login page</button>
      </div>  
  );
};

export default UserLogin;


