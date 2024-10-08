const userList = {
    
    
};


function isValidUsername(username) {
  let isValid = true;
  isValid = isValid && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}


function addMessage(user,sender, content) {
    let message = {
        [sender]: content
    };
    userList[user]["messages"].push(message);
}

function extractMessage(user){
    return userList[user]["messages"];
}

const users = {
  isValidUsername,
  userList,
  addMessage,
  extractMessage,
};
export default users;
