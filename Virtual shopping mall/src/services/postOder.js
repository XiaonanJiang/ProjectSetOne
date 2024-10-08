function postOder(id, oder) {
    return fetch('/api/oder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id:id, oder: oder})
    })
      .catch( err => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
            return response.json().then( err => Promise.reject(err) );        
        }
        return response.json();
      })
      .then(data => {
        return data.oder;
      })
      .catch(error => {
        throw error;
      });
  }
  export default postOder;