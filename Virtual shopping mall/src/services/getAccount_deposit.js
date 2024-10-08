function getAccountDeposit() {
    return fetch('/api/account_deposit')
      .catch( err => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
            return response.json().then( err => Promise.reject(err) );        
        }
        return response.json();
      })
      .then(data => {
        return data.deposit;
      })
      .catch(error => {
        throw error;
      });
  }
  export default getAccountDeposit;