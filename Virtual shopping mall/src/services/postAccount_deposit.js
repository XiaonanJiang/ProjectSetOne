function postAccountDeposit(deposit) {
    return fetch('/api/account_deposit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ deposit: deposit})
    })
      .catch( err => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
            return response.json().then( err => Promise.reject(err) );        
        }
        return response.json();
      })
      .then(data => {
        return data.storedDeposit;
      })
      .catch(error => {
        throw error;
      });
  }
  export default postAccountDeposit;