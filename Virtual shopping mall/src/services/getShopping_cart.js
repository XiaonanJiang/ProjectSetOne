function getShoppingCart() {
    return fetch('/api/shopping_cart')
      .catch( err => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
            return response.json().then( err => Promise.reject(err) );        
        }
        return response.json();
      })
      .then(data => {
        return data.shoppingCart;
      })
      .catch(error => {
        throw error;
      });
  }
  export default getShoppingCart;