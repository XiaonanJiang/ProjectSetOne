const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid').v4;


const app = express();
const PORT = 3000;

const sessions = require('./session');
const users = require('./users');
const chat = require('./chat');

app.use(cookieParser());
app.use(express.static('./public', { index: 'services.html' }));
app.use(express.json()); 



app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});


app.post('/api/session', (req, res) => {
  const { username } = req.body;
  if(!users.isValidUsername(username)) {
    console.log(username);
    res.status(400).json({ error: 'required-username' });
    return;
  }
  if(username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }
  const sid = uuid();
  sessions.addSession(sid, username);
  res.cookie('sid', sid);
  users.userList[username] ||= "";
  res.json({ username ,reloadPage: true });
});


app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(sid) {
    res.clearCookie('sid');
  }
  if(username) {
    sessions.deleteSession(sid);
  }
  res.json({ wasLoggedIn: !!username }); 
});


app.get('/api/message', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const storedMessage = chat.chatContents;
  res.json({ username, storedMessage });
});


app.put('/api/message', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { message } = req.body;
  if(!message && message !== '') {
    res.status(400).json({ error: 'required-message' });
    return;
  }
  chat.addChatContent(username, message);
  res.json({ username, storedMessage: message });
});


app.get('/api/userlist', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const userList = sessions.onlineUsers;
    res.json({ username, userList});
  });
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

