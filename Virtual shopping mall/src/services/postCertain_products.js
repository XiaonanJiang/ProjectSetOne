function postCertainProducts( id, product ) {
    return fetch('/api/certain_products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id:id, product:product})
    })
      .catch( err => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
            return response.json().then( err => Promise.reject(err) );        
        }
        return response.json();
      })
      .then(data => {
        return data.products;
      })
      .catch(error => {
        throw error;
      });
  }
  export default postCertainProducts;