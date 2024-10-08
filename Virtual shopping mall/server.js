import express from 'express';
import { v4 as uuid } from 'uuid';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;

import session from './database/session.js';
import users from './database/users.js';
import oders from './database/oders.js';
import products from './database/products.js';

app.use(express.static('dist'));

app.use(cookieParser());
app.use(express.json()); 

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); 
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
  res.setHeader('Access-Control-Allow-Credentials', 'true'); 

  next();
});


app.get('/api/user_session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      return;
    }
    res.json({ username });
  });
  
  
  app.post('/api/user_session', (req, res) => {
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
    if(username === 'manager') {
      res.status(403).json({ error: 'Only administrators can use this name' });
      return;
    }
    const sid = uuid();
    session.addSession(sid, username);
    res.cookie('sid', sid);
    if (!(username in users.userList)) {
      users.userList[username] ={
       address: {
        street: "",
        city: "",
        country: ""
      },
      membership: false,
      deposit: 0,
      orderQuantity: 0,
      numberOfItemsShoppingCart: 0,
      priceInShoppingCart: 0,
      shoppingCart: {},
      purchaseRecord: {},
      messages: []
    };
    }
      res.json({ username });
  });
  
  
  app.delete('/api/user_session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(sid) {
      res.clearCookie('sid');
    }
    if(username) {
      session.deleteSession(sid);
    }
    res.json({ wasLoggedIn: !!username }); 
  });
  
  
  app.get('/api/address', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const storedAddress = users.userList[username]["address"];
    res.json({ username, storedAddress:storedAddress });

  });
  
  
  app.post('/api/address', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const { address } = req.body;
    if(!address && address !== '') {
      res.status(400).json({ error: 'required-address' });
      return;
    }
    users.userList[username]["address"] = address;
    res.json({ username, storedAddress: address });
  });

  app.get('/api/membership', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const membership = users.userList[username]["membership"];
    res.json({ username, storedMembership:membership });
  });

  app.post('/api/membership', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    users.userList[username]["membership"] = true;
    res.json({ username});
    setTimeout(() => {
      users.userList[username]["membership"] = false;
    }, 30000); // 30000 毫秒 = 30 秒///////
  });
  
  app.get('/api/account_deposit', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const deposit = users.userList[username]["deposit"];
    res.json({ username, deposit });
  });

  app.post('/api/account_deposit', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const { deposit } = req.body;
    if(deposit >= 0) {
      users.userList[username]["deposit"] = deposit;
    }else{
      res.status(400).json({ error: 'Wrong deposit amount' });
      return;
    }
    res.json({ username, storedDeposit:deposit});
  });

  app.get('/api/order_quantity', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const orderQuantity = users.userList[username]["orderQuantity"];
    res.json({ username, orderQuantity });
  });

  app.post('/api/order_quantity', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const { orderQuantity } = req.body;
    if(orderQuantity >= 0) {
      users.userList[username]["orderQuantity"] = orderQuantity;
    }else{
      res.status(400).json({ error: 'Wrong order quantity' });
      return;
    }
    res.json({ username, storedOrderQuantity:orderQuantity});
  });

  app.get('/api/shopping_cart', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const shoppingCart = users.userList[username]["shoppingCart"];
    res.json({ username, shoppingCart });
  });

  app.post('/api/shopping_cart', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const { shoppingCart } = req.body;
    users.userList[username]["shoppingCart"] = shoppingCart;
    res.json({ username, storedShoppingCart:shoppingCart});
  });

  app.get('/api/purchase_record', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const purchaseRecord = users.userList[username]["purchaseRecord"];
    res.json({ username, purchaseRecord });
  });

  app.post('/api/purchase_record', (req, res) => {//设置单个订单记录
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const { id } = req.body;
    users.userList[username]["purchaseRecord"][id] = [id];
    const purchaseRecord = users.userList[username]["purchaseRecord"];
    res.json({ username, purchaseRecord});
  });

  app.get('/api/all_oder', (req, res) => {//获取全部订单
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const oder = oders.oder;
    res.json({ username, oder });
  });

  app.get('/api/oder', (req, res) => {//获取特定订单
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    let id =  req.query.id;
    id = id.replace(/"/g, "'");
    const oder = oders.oder['3'];
    
    res.json({ username, oder:oder });
  });

  app.post('/api/oder', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const oder  = req.body.oder;
    const id  = req.body.id;
    oders.oder[id] = oder;
    res.json({ username, oder:oder});
  });

  app.get('/api/oder_id', (req, res) => {//获取下个订单ID，并且让它+1
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const oder = oders.nextOderId;
    oders.nextOderId = oders.nextOderId+1;
    res.json({ username, oder:oder });
  });

  app.get('/api/products', (req, res) => {//获取所有产品
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const product = products;
    res.json({ username, product:product });
  });

  app.get('/api/certain_products', (req, res) => {//获取特定产品
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const {productName} = req.body;
    const product = products[productName];
    res.json({ username, product:product });
  });


  app.post('/api/certain_products', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const id = req.body.id;
    const product  = req.body.product;

    products[id]=product;
    

    res.json({ username, products});
  });


app.get('/api/message', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? session.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
    const { user } = req.query;
    const userData = JSON.parse(user);
    const newMessage = users.userList[userData]["messages"];
    res.json({ username, newMessage:newMessage });
});

app.post('/api/message', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? session.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { messageNeedToStore} = req.body;
  users.addMessage(messageNeedToStore['user'],messageNeedToStore.messageNeedToStore.sender,messageNeedToStore.messageNeedToStore.content);
  res.json({ username });
});


  app.get('/api/manager_session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      console.log("no sid or no username");//////
      return;
    }
    res.json({ username });
  });
  
  
  app.post('/api/manager_session', (req, res) => {
    const { username } = req.body;
    if(username != 'manager') {
      res.status(403).json({ error: 'name must be manager' });
      return;
    }
    const sid = uuid();
    session.addSession(sid, username);
    res.cookie('sid', sid);
    res.json({ username });
  });
  
  
  app.delete('/api/manager_session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(sid) {
      res.clearCookie('sid');
    }
    if(username) {
      session.deleteSession(sid);
    }
    res.json({ wasLoggedIn: !!username }); 
  });

  app.get('/api/number_of_items_shopping_cart', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const number = users.userList[username]["numberOfItemsShoppingCart"];
    res.json({ number:number });
  });

  app.post('/api/number_of_items_shopping_cart', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const { number } = req.body;
    users.userList[username]["numberOfItemsShoppingCart"]=number;
    res.json({ username, number:number});
  });

  app.get('/api/price_in_shopping_cart', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const number = users.userList[username]["priceInShoppingCart"];
    res.json({ number:number });
  });

  app.post('/api/price_in_shopping_cart', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const { number } = req.body;
    users.userList[username]["priceInShoppingCart"]=number;
    res.json({ username, number:number});
  });

  app.get('/api/user_name_list', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? session.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const userNameList = Object.keys(users.userList);
    res.json({ userNameList });
  });


  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
