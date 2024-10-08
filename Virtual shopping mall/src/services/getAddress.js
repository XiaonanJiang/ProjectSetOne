function getAddress() {
    return fetch('/api/address')
      .catch( err => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
            return response.json().then( err => Promise.reject(err) );        
        }
        return response.json();
      })
      .then(data => {
        return data.storedAddress;
      })
      .catch(error => {
        throw error;
      });
  }
  export default getAddress;