function postMembership() {
    return fetch('/api/membership', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .catch( err => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
            return response.json().then( err => Promise.reject(err) );        
        }
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        throw error;
      });
  }
  export default postMembership;