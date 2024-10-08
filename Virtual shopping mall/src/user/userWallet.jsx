import React, { useState } from 'react';

const UserWallet = ({ username, storedMoney, onUpdateMoney,storedMembershipStatus,
    onChangeMembershipStatus, onPageChange}) => {
  const [addDeposit, setAddDeposit] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdateMoney = () => {
    if (!isNaN(addDeposit)) {
         const moneyToAdd = parseFloat(addDeposit); 
         const currentMoney = parseFloat(storedMoney); 
        if(moneyToAdd>0){
            const computationalAid = currentMoney+moneyToAdd;
            onUpdateMoney(computationalAid);
            setErrorMessage('');
            setAddDeposit('');
        }else{
            setErrorMessage('The recharge amount must be greater than 0');
        }
      } else {
        setErrorMessage('Please enter valid numbers');
      }
  };
  const handleUpdateMembership = () => {
    if(storedMoney>=30){
        if(storedMembershipStatus === false|| typeof storedMembershipStatus === 'undefined'){
            const currentMoney = parseFloat(storedMoney); 
            const computationalAid = currentMoney-30;
            onChangeMembershipStatus(true);
            onUpdateMoney(computationalAid);
            setErrorMessage('');
        }else{
            setErrorMessage('The membership is active, please wait until the membership expires and activate again.');
        }
    }else{
        setErrorMessage('The account balance is insufficient, please recharge the account and activate membership.');
    }
  }

    const toHomePage = () => {
        onPageChange('userHomePage');
    };
  
  return (
        <div>
        <h2>Welcome, {username}! This is the financial center,
         where you can replenish funds in your account, and use 
         funds to activate membership for 30 seconds to get a 20% 
         discount on goods.</h2>
        <p>Account Balance: {storedMoney}</p>
        <input type="number" placeholder="Enter the amount" value={addDeposit} onChange={(e) => setAddDeposit(e.target.value)} />
        <button onClick={handleUpdateMoney}>Confirm recharge</button>
        <p>Have membership or not:  {storedMembershipStatus ? 'Yes' : 'No'}</p>
        <button onClick={handleUpdateMembership}>Start membership $30</button>
        {errorMessage && <p className="hint">{errorMessage}</p>}
        <button onClick={toHomePage}>Return to the previous interface</button>
      </div>
  );
};

export default UserWallet;

