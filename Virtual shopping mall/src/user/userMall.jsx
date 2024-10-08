import React, { useState } from 'react';
import getMembership from '../services/getMembership';
import getOderId from '../services/getOder_id';


const UserMall = ({ username, storedMoney, onUpdateMoney,storedMembershipStatus,
    shoppingCart, onUpdatedShoppingCart,onUpdatedUserOrder,
    stroedOrderQuantity,onUpdatedOrderQuantity,onUpdatedOrder,products,
    storedNumberOfItemsShoppingCart,onUpdatedNumberOfItemsShoppingCart
    ,storedPriceInShoppingCart,onUpdatedPriceInShoppingCart,onPageChange,storedAddress}) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddToCart = (productName) => {
    onUpdatedShoppingCart(productName,true);
    let number =  parseInt(storedNumberOfItemsShoppingCart, 10);
    onUpdatedNumberOfItemsShoppingCart(number+1);
    let number2 =  parseFloat(storedPriceInShoppingCart);
    let number3 = parseFloat(products[productName]['price']);
    onUpdatedPriceInShoppingCart(number2+number3);
    setErrorMessage('');
  };

  const handleRemoveFromCart = (productName) =>{
    onUpdatedShoppingCart(productName,false);
    let number =  parseInt(storedNumberOfItemsShoppingCart, 10);
    onUpdatedNumberOfItemsShoppingCart(number-1);
    let number2 =  parseFloat(storedPriceInShoppingCart);
    let number3 = parseFloat(products[productName]['price']);
    onUpdatedPriceInShoppingCart(number2-number3);
    setErrorMessage('');
  };

  const checkout = () => {
    getMembership().then(storedMembership => {
        if(storedMembership === true){
            if(storedMoney>=storedPriceInShoppingCart*0,8){
                getOderId().then(id => {
                    onUpdatedUserOrder(id);
                    onUpdateMoney(storedMoney-storedPriceInShoppingCart*0,8);
                    const currentDateTime = new Date(); 
                    const currentDateTimeString = currentDateTime.toLocaleString(); 
                    const newOder ={
                     [id]:{userName:username,
                        oderTime:currentDateTimeString,
                        ShippingAddress:storedAddress,
                        oderStatus:'Order placed',
                        memberDiscounts:true,
                        productQuantity:storedNumberOfItemsShoppingCart,
                        totalPrice:storedPriceInShoppingCart*0.8,
                        shoppingCart:shoppingCart
                     }
                    };
                    onUpdatedOrder(id,newOder[id]);
                    onUpdatedShoppingCart('all', false);
                    onUpdatedOrderQuantity(stroedOrderQuantity+1);
                    onUpdatedNumberOfItemsShoppingCart(0);
                    onUpdatedPriceInShoppingCart(0);
                  }).catch(error => {
                    setErrorMessage(error.error); 
                  });
            }else{
                setErrorMessage('The balance is not enough to pay for the order, please increase the balance or reduce the items')
            };
        }else{
            if(storedMoney>=storedPriceInShoppingCart){
                getOderId().then(id => {
                    onUpdatedUserOrder(id);
                    onUpdateMoney(storedMoney-storedPriceInShoppingCart);
                    const currentDateTime = new Date(); 
                    const currentDateTimeString = currentDateTime.toLocaleString(); 
                    const newOder ={
                     [id]:{userName:username,
                        oderTime:currentDateTimeString,
                        ShippingAddress:storedAddress,
                        oderStatus:'Order placed',
                        memberDiscounts:false,
                        productQuantity:storedNumberOfItemsShoppingCart,
                        totalPrice:storedPriceInShoppingCart,
                        shoppingCart:shoppingCart
                     }
                    };
                    onUpdatedOrder(id,newOder[id]);
                    onUpdatedShoppingCart('all', false);
                    onUpdatedOrderQuantity(stroedOrderQuantity+1);
                    onUpdatedNumberOfItemsShoppingCart(0);
                    onUpdatedPriceInShoppingCart(0);
                  }).catch(error => {
                    setErrorMessage(error.error); 
                  });
            }else{
                setErrorMessage('The balance is not enough to pay for the order, please increase the balance or reduce the items')
            };
        }
      }).catch(error => {
        setErrorMessage(error.error); 
      });
  };

    const toHomePage = () => {
        onPageChange('userHomePage');
    };
  
  return (
        <div>
        <h2>Welcome, {username}! This is a shopping mall. You can add the items 
        you want to your shopping cart. and checkout to buy them.Activated members 
        will bring you 20% discount, and the delivery address can be modified in 
        the user account information page.</h2>
        <p>Account Balance: {storedMoney}</p>
        <p>Have membership or not:  {storedMembershipStatus ? 'Yes' : 'No'}</p>
        <div>
        <ul>
        {Object.keys(products).map((productName) => {
          const { price, state } = products[productName];
          if (state === 'off shelf') {
            return null; 
          }
          return (
            <li key={productName}>
              <span>{productName}</span> - <span>price: ${price}</span> - <span>state: {state}</span>
              {state === 'available for purchase' && (
                <button onClick={() => handleAddToCart(productName)}>Add to cart</button>
              )}
            </li>
          );
        })}
        </ul>
        </div>
        <div>
      <h2>Shopping Cart</h2>
      <ul>
      {shoppingCart && Object.keys(shoppingCart).map((productName) => (
          <li key={productName}>
            <div>{productName} : </div>
            <div>number: {shoppingCart[productName].number}</div>
            <div>price: {shoppingCart[productName].price}</div>
            <button onClick={() => handleAddToCart(productName)}>Add One</button>
            <button onClick={() => handleRemoveFromCart(productName)}>Reduce One</button>
          </li>
        ))}
      </ul>
      <p>Total number of products: {storedNumberOfItemsShoppingCart}</p>
      <p>original price: {storedPriceInShoppingCart}</p>
      <p>membership price: {storedPriceInShoppingCart*0.8}</p>
      <button onClick={checkout} disabled={!shoppingCart || Object.keys(shoppingCart).length === 0}>
        CheckOut
      </button>
    </div>
        {errorMessage && <p className="hint">{errorMessage}</p>}
        <button onClick={toHomePage}>Return to the previous interface</button>
      </div>
  );
};

export default UserMall;

