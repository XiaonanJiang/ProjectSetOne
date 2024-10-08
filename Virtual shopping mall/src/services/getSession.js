function getSession() {
    return fetch('/api/user_session')
      .catch( err => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
            return response.json();        
        }
        return response.json();
      })
      .then(data => {
        return data.username;
      })
      .catch(error => {
        throw error;
      });
  }
  export default getSession;
