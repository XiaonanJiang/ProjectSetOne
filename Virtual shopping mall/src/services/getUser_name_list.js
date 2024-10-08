function getUserNameList() {
    return fetch('/api/user_name_list')
      .catch( err => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
            return response.json().then( err => Promise.reject(err) );        
        }
        return response.json();
      })
      .then(data => {
        return data.userNameList;
      })
      .catch(error => {
        throw error;
      });
  }
  export default getUserNameList;