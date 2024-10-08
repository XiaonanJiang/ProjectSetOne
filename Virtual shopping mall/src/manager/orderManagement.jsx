import React, { useState } from 'react';

const OrderManagement = ({ username, onPageChange, orders, onUpdateOderStatus, onUpdatedMessages}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [cancelReason, setCancelReason] = useState('');


  const handleCompleteOrder = (orderId) => {
    onUpdateOderStatus(orderId, 'completed');
  };

  const handleCancelOrder = (orderId) => {
    onUpdateOderStatus(orderId, 'cancelling');

    if (cancelReason.trim() !== '') {
        onUpdateOderStatus(orderId, 'cancelled');
        const newMessage = {user:orders[orderId]["userName"], sender:'System', content:cancelReason};
        onUpdatedMessages(newMessage);

        setCancelReason('');
        setErrorMessage('');
    } else {
        setErrorMessage('Need to give a reason for order cancellation');
    }
  };

    const toHomePage = () => {
        onPageChange('managerHomePage');
    };
  
  return (
        <div>
        <h2>Welcome, {username}! You can manage orders placed by your 
        customers and choose to have them delivered or canceled. Canceled 
        orders will require a reason.</h2>
        <div>
        <h2>Order List</h2>
        {Object.keys(orders).map((orderId) => (
          <div key={orderId} className="order">
          <p>order Id: {orderId}</p>
          <pre>{JSON.stringify(orders[orderId], null, 2)}</pre>
          
          {(orders[orderId].oderStatus !== 'completed' &&orders[orderId].oderStatus !== 'cancelled' ) && (
            <>
              <button onClick={() => handleCompleteOrder(orderId)}>Mark as complete</button>
              <button onClick={() => handleCancelOrder(orderId)}>cancel order</button>
              {orders[orderId].oderStatus === 'cancelled' && (
                <p>Reason for cancellation: {orders[orderId].cancelReason}</p>
              )}
              {orders[orderId].oderStatus === 'cancelling' && (
                <input
                type="text"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Please enter reason for cancellation"
              />
            )}
            </>
          )}
        </div>
        ))}
        </div>
        {errorMessage && <p className="hint">{errorMessage}</p>}
        <button onClick={toHomePage}>Return to the previous interface</button>
      </div>
  );
};

export default OrderManagement;

