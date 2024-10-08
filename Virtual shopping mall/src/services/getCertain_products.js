function getCertainProducts(productName) {
    return fetch('/api/certain_products',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productName: productName})
    })
      .catch( err => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
            return response.json().then( err => Promise.reject(err) );        
        }
        return response.json();
      })
      .then(data => {
        return data.product;
      })
      .catch(error => {
        throw error;
      });
  }
  export default getCertainProducts;