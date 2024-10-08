function getMembership() {
    return fetch('/api/membership')
      .catch( err => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
            return response.json().then( err => Promise.reject(err) );        
        }
        return response.json();
      })
      .then(data => {
        return data.storedMembership;
      })
      .catch(error => {
        throw error;
      });
  }
  export default getMembership;