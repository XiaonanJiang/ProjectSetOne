import React, { useState } from 'react';
import getOder from '../services/getOder';

const UserAccountInformation = ({ username,storedAddress,onUpdateAddress,stroedMembership,
    storedAccountDeposit,stroedOrderQuantity,storedUserOrder, onPageChange, order}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [address, setAddress] = useState({
    street: '' ,
    city: '',
    country: '' 
  });
  const [selectedOrder, setSelectedOrder] = useState('');
  const [oderDetail, setOderDetail] = useState('');

      
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
    [name]: value
  });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(address.city ==='' || address.country ==='' ||address.street ==='' ){
      setErrorMessage('Cannot submit an empty address. All three parts of the address must be filled in.');
    }else{
      onUpdateAddress(address);
      setErrorMessage(""); 
      setAddress({
        street: '',
        city: '',
        country: ''
      });

    }
    
    };

    const handleIdClick = (id) => {
      setErrorMessage('');
        setSelectedOrder(id);
        getOder(id).then(data=>{
        })
        setOderDetail(order[id]);
        console.log(order);
    };


    const toHomePage = () => {
        onPageChange('userHomePage');
    };
  return (
        <div>
        <h2>Username: {username}</h2>
        <p>Saved address: </p>
        <p>Street: {storedAddress.street}</p>
        <p>City: {storedAddress.city}</p>
        <p>Country: {storedAddress.country}</p>

        <form onSubmit={handleSubmit}>
        <label>Street:
          <input type="text" name="street" value={address.street} onChange={handleChange}/>
        </label>
        <br />
        <label>City:
          <input type="text" name="city" value={address.city} onChange={handleChange}/>
        </label>
        <br />
        <label> Country:
          <input type="text" name="country" value={address.country} onChange={handleChange}/>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
        <p>Have membership or not:  {stroedMembership ? 'Yes' : 'No'}</p>
        <p>Account funds: {storedAccountDeposit}</p>
        <p>Total order quantity: {stroedOrderQuantity}</p>
        <p>Placed order: </p>
        <ul>
        {Object.entries(storedUserOrder).map(([id, orderArray]) => (
          <li key={id}>
            <p>id: {id}</p>
            <button onClick={() => handleIdClick(id)}>View order {id}</button>
            {selectedOrder === id && (
              <div>
                <p><strong>Order details:</strong></p>
                <pre>{JSON.stringify(oderDetail, null, 2)}</pre>
              </div>
            )}
          </li>
        ))}
      </ul>
        <button onClick={toHomePage}>Return to the previous interface</button>
        {errorMessage && <p className="hint">{errorMessage}</p>}
      </div>
  );
};

export default UserAccountInformation;

