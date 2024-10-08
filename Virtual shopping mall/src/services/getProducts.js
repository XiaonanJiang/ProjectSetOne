function getProducts() {
    return fetch('/api/products')
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
  export default getProducts;