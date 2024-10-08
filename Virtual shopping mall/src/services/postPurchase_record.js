function postPurchaseRecord(id) {
    return fetch('/api/purchase_record', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id})
    })
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
  export default postPurchaseRecord;