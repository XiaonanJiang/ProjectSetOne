function getMessage(user) {
    return fetch(`/api/message?user=${encodeURIComponent(JSON.stringify(user))}`, {
        method: 'GET',
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
        return data.newMessage;
      })
      .catch(error => {
        throw error;
      });
  }
  export default getMessage;