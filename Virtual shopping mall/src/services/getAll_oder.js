function getAllOder() {
    return fetch('/api/all_oder')
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
  export default getAllOder;