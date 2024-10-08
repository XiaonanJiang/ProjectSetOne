function postOrderQuantity(orderQuantity) {
    return fetch('/api/order_quantity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ orderQuantity: orderQuantity})
    })
      .catch( err => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
            return response.json().then( err => Promise.reject(err) );        
        }
        return response.json();
      })
      .then(data => {
        return data.storedOrderQuantity;
      })
      .catch(error => {
        throw error;
      });
  }
  export default postOrderQuantity;