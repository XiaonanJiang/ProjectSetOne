function postNumberOfItemsShoppingCart(number) {
    return fetch('/api/number_of_items_shopping_cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ number: number})
    })
      .catch( err => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
            return response.json().then( err => Promise.reject(err) );        
        }
        return response.json();
      })
      .then(data => {
        return data.number;
      })
      .catch(error => {
        throw error;
      });
  }
  export default postNumberOfItemsShoppingCart;