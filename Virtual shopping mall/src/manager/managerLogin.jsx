import React, { useState } from 'react';
import createManagerSession from '../services/creatManager_session';

function isValidUsername(username) {
    let isValid = true;
    isValid = isValid && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
}

const ManagerLogin = ({ onLogin , onPageChange}) => {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if(isValidUsername(username)) {
        if(username === 'dog'){
            setErrorMessage('Invalid username, Username cannot be dog');
        }else if(username != 'manager'){
            setErrorMessage('This username can only be manager. Other names can only be used on the customer login interface.');
        }else{
            setErrorMessage('');
            createManagerSession(username).then(result => {
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
    onPageChange('userLogin');
  }

  return (
        <div>
        <h2>Manager Login</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        {errorMessage && <p className="hint">{errorMessage}</p>}
        <button onClick={handlePageChange}>Go to the user login page</button>
      </div>  
  );
};

export default ManagerLogin;


