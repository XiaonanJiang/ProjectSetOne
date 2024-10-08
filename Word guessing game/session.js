const uuid = require('uuid').v4;

const sessions = {};
const onlineUsers = {};

function addSession(sid, username) {
  sessions[sid] = {username};
  if (onlineUsers.hasOwnProperty(username)) {
    onlineUsers[username] = onlineUsers[username] + 1;
  } else {
    onlineUsers[username] = 1;
  }
  return sid;
}

function getSessionUser(sid) {
  return sessions[sid]?.username;
}

function deleteSession(sid) {
  const name = sessions[sid];
  onlineUsers[name.username] = onlineUsers[name.username]-1;
  delete sessions[sid];
  if (onlineUsers[name.username] === 0 ) {
    delete onlineUsers[name.username]; 
   } 
   if (onlineUsers[name.username] === null) {
    delete onlineUsers[name.username];  
  } 
}

module.exports = {
    sessions,
    onlineUsers,
    addSession,
    deleteSession,
    getSessionUser,
  };
  