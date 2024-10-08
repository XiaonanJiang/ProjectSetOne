import React, { useState } from 'react';

const ProductManagement = ({ username, onPageChange,products, manageProductStatus}) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleStateChange = (productId, price ,newState) => {
    setErrorMessage('');
    const updatedProduct = {
      price: price,
      state: newState
    };
    manageProductStatus(productId,updatedProduct);
  };

    const toHomePage = () => {
        onPageChange('managerHomePage');
    };
  
  return (
        <div>
        <h2>Welcome, {username}! You can manage the status of the 
        products on this page, remove them from the shelves or set 
        them as out of stock, etc.</h2>
        <div>
        <h2>Order List</h2>
        {Object.keys(products).map((productId) => {
        const product = products[productId];
        return (
          <div key={productId} className="product">
            <p>Product Name: {productId}</p>
            <p>Price: {product.price}</p>
            <p>State: {product.state}</p>
              <button onClick={() => handleStateChange(productId,product.price, 'available for purchase')}>
              set available for purchase
            </button>
            <button onClick={() => handleStateChange(productId,product.price ,'out of stock')}>
               set out of stock
            </button>
            <button onClick={() => handleStateChange(productId, product.price,'off shelf')}>
              set off shelf
            </button>
          </div>
        );
      })}
        </div>
        {errorMessage && <p className="hint">{errorMessage}</p>}
        <button onClick={toHomePage}>Return to the previous interface</button>
      </div>
  );
};

export default ProductManagement;

