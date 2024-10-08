  let state = "notLogedIn";
  function getSession() {
    return fetch('/api/session')
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
        displayError(error.error);
      });
  }
  
  function createSession(username) {
      return fetch('/api/session', {
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
        state = "logedIn";
        return data.username;
      })
      .catch(error => {
        displayError(error.error);
      });
  }
  
  // 终止用户会话
  function deleteSession() {
    return fetch('/api/session', {
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
        state = "notLogedIn";
        return data.wasLoggedIn;
      })
      .catch(error => {
        displayError(error.error);
      });
  }
  
  // 获取聊天消息
  function getChatMessages() {
    return fetch('/api/message')
      .catch( err => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
            return response.json().then( err => Promise.reject(err) );        
        }
        return response.json();
      })
      .then(data => {
        return data.storedMessage;
      })
      .catch(error => {
        displayError(error.error);
      });
  }
  
  // 发送聊天消息
  function sendChatMessage(message) {
    return fetch('/api/message', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: message})
    })
      .catch( err => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
            return response.json().then( err => Promise.reject(err) );        
        }
        return response.json();
      })
      .then(data => {

        return data.message;
      })
      .catch(error => {
        displayError(error.error);
      });
  }
  
  // 获取在线用户列表
  function getOnlineUsers() {
    return fetch('/api/userlist')
      .catch( err => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
            return response.json().then( err => Promise.reject(err) );        
        }
        return response.json();
      })
      .then(data => {
        return data.userList;
      })
      .catch(error => {
        displayError(error.error);
      });
  }

  function displayError(errorMessage) {
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.textContent = errorMessage;
  }


  function render() {
    if (state === "logedIn"){
        renderChatPage();
        renderInputFieldContainer();
    }else{
        renderLoginForm();
    }
  }

  function renderLoginForm(){
    const serviceBodyA = document.getElementById('serviceBodyA');
    serviceBodyA.innerHTML = '';
    const serviceBodyB = document.getElementById('serviceBodyB');
    serviceBodyB.innerHTML = '';
    const serviceBodyC = document.getElementById('serviceBodyC');
    serviceBodyC.innerHTML = '';
    const serviceBodyD = document.getElementById('serviceBodyD');
    serviceBodyD.innerHTML = '';
    const InputFieldContainer = document.getElementById('InputFieldContainer');
    InputFieldContainer.innerHTML = '';
    serviceBodyA.innerHTML = `
    <form id="loginForm">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username"><br><br>
      <button type="submit">Submit</button>
    </form>
    `;
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', function(event) {
      event.preventDefault(); 
      try{
      const formData = new FormData(form);
      const username = formData.get('username');
      if(isValidUsername(username)) {
        if(username != 'dog') {
          createSession(username).then(username => {
            renderChatPage();
            renderInputFieldContainer();
          });
        }else{
          throw new Error('Username cannot be dog');
        }
      }else{
        throw new Error('Username Contains invalid characters');
      }
    }catch(error){
      displayError(error.message);
    }
      });
  }
  function renderChatPage(){
    const serviceBodyA = document.getElementById('serviceBodyA');
    serviceBodyA.innerHTML = '';
    const serviceBodyB = document.getElementById('serviceBodyB');
    serviceBodyB.innerHTML = '';
    const serviceBodyC = document.getElementById('serviceBodyC');
    serviceBodyC.innerHTML = '';
    const serviceBodyD = document.getElementById('serviceBodyD');
    serviceBodyD.innerHTML = '';
    getSession().then(username => {
      serviceBodyA.insertAdjacentHTML('beforeend', `
    <p>Current user:${username}</p>
    `);
    });
    serviceBodyB.insertAdjacentHTML('beforeend', `
    <form id="logOut">
      <button type="submit">Log out</button>
    </form>
    `);
    const logOutButten = document.getElementById('logOut');
    logOutButten.addEventListener('click', () => {
       deleteSession()
       renderLoginForm();
    });

    getChatMessages().then(allMessage => {
      serviceBodyC.insertAdjacentHTML('beforeend',`
    <p>"Chat Record:"</p>
    <div id="allMessageBox">
    </div>
    `);
    const allMessageBox = document.getElementById('allMessageBox');
    allMessage.forEach(content => {
      const { username, message } = content;
      allMessageBox.innerHTML += `<p><strong>${username}:</strong> ${message}</p>`;
    });
    });
    getOnlineUsers().then(onlineUsers => {
      serviceBodyD.insertAdjacentHTML('beforeend',`
    <p>"Online User:"</p>
    <div id="logedinUserBox">
    </div>
    `);
    const logedinUserBox = document.getElementById('logedinUserBox');
    const keys = Object.keys(onlineUsers);
    const keysHTML = keys.map(key => `<p>${key}</p>`).join('');
    logedinUserBox.innerHTML = keysHTML;
    });
  }

  function renderInputFieldContainer(){
    const InputFieldContainer = document.getElementById('InputFieldContainer');
    InputFieldContainer.innerHTML = `
    <form id="userInput">
      <input  name="enter" type="text" placeholder="Enter your message...">
      <button type="submit">Submit</button>
    </form>
    `;
    const form = document.getElementById('userInput');
    form.addEventListener('submit', function(event) {
      event.preventDefault(); 
      const formData = new FormData(form);
      const userInput = formData.get('enter');
      sendChatMessage(userInput);
      renderChatPage();
      renderInputFieldContainer();
    });
  }

  function isValidUsername(username) {
    let isValid = true;
    isValid = isValid && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
  }
  render();

  function refresh(){
    if(state === "logedIn"){

      renderChatPage();
    }
  }
  setInterval(refresh, 5000);
  


