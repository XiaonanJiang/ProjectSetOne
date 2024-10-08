import React, { useState } from 'react';

const UserMessages = ({ username, messages, onUpdatedMessages ,onPageChange}) => {
  const [messageBeingEntered, newMessageBeingEntered] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNewMessages = () => {
    const newMessage = {user:username,sender:username, content:messageBeingEntered};
    onUpdatedMessages(newMessage);
    newMessageBeingEntered('');
    setErrorMessage('');
  };

    const toHomePage = () => {
        onPageChange('userHomePage');
    };
  
  return (
        <div>
        <h2>Welcome, {username}! Here is the message interface. The system will 
        give notifications based on your operations. You can also chat with the 
        manager here.</h2>
        <div className="chat-messages">
        {messages.map((messageObject, index) => (
          <div key={index} className="message">
            {Object.entries(messageObject).map(([sender, content]) => (
           <p key={sender}>
          {sender}: {content}
        </p>
      ))}
          </div>
        ))}
        </div>
        <input type="text" placeholder="Enter...." value={messageBeingEntered} onChange={(e) => newMessageBeingEntered(e.target.value)} />
        <button onClick={handleNewMessages}>send</button>
        {errorMessage && <p className="hint">{errorMessage}</p>}
        <button onClick={toHomePage}>Return to the previous interface</button>
      </div>
  );
};

export default UserMessages;

