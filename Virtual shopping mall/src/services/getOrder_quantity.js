function getOrderQuantity() {
    return fetch('/api/order_quantity')
      .catch( err => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
            return response.json().then( err => Promise.reject(err) );        
        }
        return response.json();
      })
      .then(data => {
        return data.orderQuantity;
      })
      .catch(error => {
        throw error;
      });
  }
  export default getOrderQuantity;