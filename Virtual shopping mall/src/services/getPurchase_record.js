function getPurchaseRecord() {
    return fetch('/api/purchase_record')
      .catch( err => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
            return response.json().then( err => Promise.reject(err) );        
        }
        return response.json();
      })
      .then(data => {
        return data.purchaseRecord;
      })
      .catch(error => {
        throw error;
      });
  }
  export default getPurchaseRecord;