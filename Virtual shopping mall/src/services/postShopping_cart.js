function postShoppingCart(shoppingCart) {
    return fetch('/api/shopping_cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ shoppingCart: shoppingCart})
    })
      .catch( err => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
            return response.json().then( err => Promise.reject(err) );        
        }
        return response.json();
      })
      .then(data => {
        return data.storedShoppingCart;
      })
      .catch(error => {
        throw error;
      });
  }
  export default postShoppingCart;