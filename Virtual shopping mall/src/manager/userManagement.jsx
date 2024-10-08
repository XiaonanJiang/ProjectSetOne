import React, { useState } from 'react';

const UserManagement = ({username ,userList, onPageChange,setAdministratorSelectedUser }) => {
    const [errorMessage, setErrorMessage] = useState('');
  const handleSendMessage = (chatUsername) => {
    setErrorMessage('');
    setAdministratorSelectedUser(chatUsername);
    onPageChange('chatWithUser');
  };
  const toHomePage = () => {
    onPageChange('managerHomePage');
};

  return (
    <div>
      <h2>Welcome, {username}! You can chat with any customer</h2>
      <ul>
      {userList.map((chatUsername) => (
            <li key={chatUsername}>
              {chatUsername}
            <button onClick={() => handleSendMessage(chatUsername)}>Start chatting</button>
          </li>
        ))}
      </ul>
        {errorMessage && <p className="hint">{errorMessage}</p>}
        <button onClick={toHomePage}>Return to the previous interface</button>
    </div>
  );
};

export default UserManagement;