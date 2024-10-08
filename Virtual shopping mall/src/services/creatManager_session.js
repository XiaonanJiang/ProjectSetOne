function createManagerSession(username) {
    return fetch('/api/manager_session', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username })
  })
    .catch( err => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {
          return response.json().then( err => Promise.reject(err) );        
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
export default createManagerSession;