function deleteSession() {
    return fetch('/api/user_session', {
      method: 'DELETE'
    })
      .catch( err => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
            return response.json().then( err => Promise.reject(err) );        
        }
        return response.json();
      })
      .then(data => {
        return data.wasLoggedIn;
      })
      .catch(error => {
        throw error;
      });
  }
  export default deleteSession;