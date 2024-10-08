function getOderId() {
    return fetch('/api/oder_id')
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
  export default getOderId;