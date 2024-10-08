import React, { useState, useEffect } from 'react';
import './App.css';

import UserLogin from './user/userLogin';
import UserHomePage from './user/userHomePage';
import UserAccountInformation from './user/userAccountInformation';
import UserMall from './user/userMall';
import UserWallet from './user/userWallet';
import UserMessages from './user/userMessages';

import ManagerLogin from './manager/managerLogin';
import ManagerHomePage from './manager/managerHomePage';
import OrderManagement from './manager/orderManagement';
import ProductManagement from './manager/productManagement';
import UserManagement from './manager/userManagement';
import ChatWithUser from './manager/chatWithUser';


import getAddress from './services/getAddress';
import postAddress from './services/postAddress';
import getMembership from './services/getMembership';
import postMembership from './services/postMembership';
import getAccountDeposit from './services/getAccount_deposit';
import postAccountDeposit from './services/postAccount_deposit';
import getOrderQuantity from './services/getOrder_quantity';
import postOrderQuantity from './services/postOrder_quantity';
import getPurchaseRecord from './services/getPurchase_record';
import postPurchaseRecord from './services/postPurchase_record';
import getShoppingCart from './services/getShopping_cart';
import postShoppingCart from './services/postShopping_cart';
import getProducts from './services/getProducts';
import getCertainProducts from './services/getCertain_products';
import postCertainProducts from './services/postCertain_products';
import getNumberOfItemsShoppingCart from './services/getNumber_of_items_shopping_cart';
import postNumberOfItemsShoppingCart from './services/postNumber_of_items_shopping_cart';
import getPriceInShoppingCart from './services/getPrice_in_shopping_cart';
import postPriceInShoppingCart from './services/postPrice_in_shopping_cart';
import getMessage from './services/getMessage';
import postMessage from './services/postMessage';
import getAllOder from './services/getAll_oder';
import postOder from './services/postOder';
import getUserNameList from './services/getUser_name_list';
import getOder from './services/getOder';
import getSession from './services/getSession';



const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState({});
  const [membership, setMembership] = useState(false);
  const [accountDeposit, setAccountDeposit] = useState(0);
  const [orderQuantity, setOrderQuantity] = useState(0);//指个人的
  const [userOrder, setUserOrder] = useState({});//个人订单记录
  const [shoppingCart, setShoppingCart] = useState({});
  const [products, setProducts] = useState({});
  const [numberOfItemsShoppingCart, setNumberOfItemsShoppingCart] = useState(0);
  const [priceInShoppingCart, setPriceInShoppingCart] = useState(0);
  const [messages, setMessages] = useState([]);
  const [orders, setOrders] = useState({});
  const [userList, setUserList] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState('userLogin'); 
  const [AdministratorSelectedUser, setAdministratorSelectedUser] = useState(''); 

//如果不在和用户聊天界面，设置选择用户为空
  useEffect(() => {
    setErrorMessage('');
    getSession().then(username => {
      if(username){
        setUsername(username);
        setLoggedIn(true);
        if(username === 'manager' && currentPage ==='managerLogin'){
            setCurrentPage('managerHomePage');
        }else if(username === 'manager' && currentPage ==='userLogin'){
            setCurrentPage('managerHomePage');
        }else if(currentPage ==='userLogin'){
            setCurrentPage('userHomePage');
        }
      }else{
        setLoggedIn(false);
        setCurrentPage('userLogin');
      }
    }).catch(error => {
      setErrorMessage(error.error); 
    });
    }, [loggedIn]); 


    useEffect(() => {
        const fetchDataForAdmin = () => {
            fetchProducts();
            fetchOrders();
            fetchUserList();
            if(AdministratorSelectedUser!=''){
              fetchMessages();
            }
        };
        if (loggedIn && username === 'manager') {
          fetchDataForAdmin();
          const intervalId = setInterval(fetchDataForAdmin, 5000);
          return () => clearInterval(intervalId);
        } 
      }, [loggedIn, username, AdministratorSelectedUser ]); 



      useEffect(() => {
        const fetchDataForUser = () => {
            fetchAddress();
            fetchMembership();
            fetchAccountDeposit();
            fetchOrderQuantity();
            fetchUserOrder();
            fetchShoppingCart();
            fetchProducts();
            fetchNumberOfItemsShoppingCart();
            fetchPriceInShoppingCart();
            fetchMessages();
        };
        if (loggedIn && username !== 'manager') {
          fetchDataForUser();
          const intervalId = setInterval(fetchDataForUser, 5000);
          return () => clearInterval(intervalId);
        } 
      }, [loggedIn, username]); 

      useEffect(() => {
        if (currentPage !== 'chatWithUser') {
          setAdministratorSelectedUser('');
        }
      }, [currentPage]);



    const fetchAddress = () => {
        getAddress().then(storedAddress => {
            setAddress(storedAddress);
          return storedAddress;
        }).catch(error => {
          setErrorMessage(error.error); 
        });
      };   
      
      const fetchMembership = () => {
        getMembership().then(storedMembership => {
            setMembership(storedMembership);
          return storedMembership;
        }).catch(error => {
          setErrorMessage(error.error); 
        });
      };
      const fetchAccountDeposit = () => {
        getAccountDeposit().then(deposit => {
            setAccountDeposit(deposit);
          return deposit;
        }).catch(error => {
          setErrorMessage(error.error); 
        });
      };
      const fetchOrderQuantity = () => {
        getOrderQuantity().then(orderQuantity => {
            setOrderQuantity(orderQuantity);
          return orderQuantity;
        }).catch(error => {
          setErrorMessage(error.error); 
        });
      };
      const fetchUserOrder = () => {
        getPurchaseRecord().then(purchaseRecord => {
            setUserOrder(purchaseRecord);
          return purchaseRecord;
        }).catch(error => {
          setErrorMessage(error.error); 
        });
      };
      const fetchShoppingCart = () => {
        getShoppingCart().then(shoppingCart => {
            setShoppingCart(shoppingCart);
          return shoppingCart;
        }).catch(error => {
          setErrorMessage(error.error); 
        });
      };
      const fetchProducts = () => {
        getProducts().then(product => {
            setProducts(product);
          return product;
        }).catch(error => {
          setErrorMessage(error.error); 
        });
      };
      const fetchNumberOfItemsShoppingCart = () => {
        getNumberOfItemsShoppingCart().then(numberOfItemsShoppingCart => {
            setNumberOfItemsShoppingCart(numberOfItemsShoppingCart);
          return numberOfItemsShoppingCart;
        }).catch(error => {
          setErrorMessage(error.error); 
        });
      };
      const fetchPriceInShoppingCart = () => {
        getPriceInShoppingCart().then(getPriceInShoppingCart => {
            setPriceInShoppingCart(getPriceInShoppingCart);
          return getPriceInShoppingCart;
        }).catch(error => {
          setErrorMessage(error.error); 
        });
      };
      const fetchMessages = () => {
        let user = username;
        if(username === 'manager' && AdministratorSelectedUser != ''){
            user = AdministratorSelectedUser;
        }
        getMessage(user).then(newMessage => {
            setMessages(newMessage);
          return newMessage;
        }).catch(error => {
          setErrorMessage(error.error); 
        });
      };
      const fetchOrders = () => {
        getAllOder().then(oder => {
            setOrders(oder);
          return oder;
        }).catch(error => {
          setErrorMessage(error.error); 
        });
      };
      const fetchUserList = () => {
        getUserNameList().then(userNameList => {
            setUserList(userNameList);
          return userNameList;
        }).catch(error => {
          setErrorMessage(error.error); 
        });
      };
      


  const handleLogin = (username) => {
    setErrorMessage('');
    if(username === 'manager'){
        setLoggedIn(true);
        setUsername(username);
        setCurrentPage('managerHomePage');
    }else{
        setLoggedIn(true);
        setUsername(username);
        setCurrentPage('userHomePage');
    }
  };

  const handlePageChange =(newPage)=> {
    setCurrentPage(newPage);
    setErrorMessage('');
  }

  const handleLogout = () => {
    setLoggedIn(false);
    setCurrentPage('userLogin');
    setErrorMessage('');

  };

  const handleAddress= (address) => {
    setErrorMessage('');
    postAddress(address).then(storedAddress => {
        setAddress(storedAddress);
        return storedAddress;
      }).catch(error => {
        setErrorMessage(error.error); 
      });
  };

  const handleMembership= (tf) => {
    setErrorMessage('');
    if(tf === true){
        postMembership().then(data => {
            setMembership(true);
            return data
          }).catch(error => {
            setErrorMessage(error.error); 
          });
      };
  };
  
  const handleAccountDeposit= (number) => {
    setErrorMessage('');
    if(number >= 0){
        postAccountDeposit(number).then(data => {
            setAccountDeposit(number);
            return data
          }).catch(error => {
            setErrorMessage(error.error); 
          });
      }else{
        setErrorMessage('The account balance cannot be less than 0'); 
      }
  };
  
  const handleOrderQuantity= (number) => {
    setErrorMessage('');
    if(number >= 0){
        postOrderQuantity(number).then(data => {
            setOrderQuantity(number);
            return data
          }).catch(error => {
            setErrorMessage(error.error); 
          });
      }else{
        setErrorMessage('The total number of orders is not less than 0'); 
      }
  };
  
  const handleUserOrder= (id) => {
    setErrorMessage('');
    postPurchaseRecord(id).then(purchaseRecord => {
        setUserOrder(purchaseRecord);
        return purchaseRecord
        }).catch(error => {
            setErrorMessage(error.error); 
        });
  };

  
  const handleShoppingCart= (productName, tOrF) => {
    setErrorMessage('');
    if(productName==='all'){
        const cart={};
        postShoppingCart(cart).then(storedShoppingCart => {
            setShoppingCart(storedShoppingCart);
            }).catch(error => {
                setErrorMessage(error.error); 
            });
    }else if(tOrF === true){
        getShoppingCart().then(storedShoppingCart => {
            if (storedShoppingCart.hasOwnProperty(productName)) {
                storedShoppingCart[productName]['number']=storedShoppingCart[productName]['number']+1;
                postShoppingCart(storedShoppingCart).then(storedShoppingCart => {
                    setShoppingCart(storedShoppingCart);
                    }).catch(error => {
                        setErrorMessage(error.error); 
                    });
            }else{
                storedShoppingCart[productName]={
                    number:1,
                    price:products[productName]['price'],
                }
                postShoppingCart(storedShoppingCart).then(storedShoppingCart => {
                    setShoppingCart(storedShoppingCart);
                    }).catch(error => {
                        setErrorMessage(error.error); 
                    });
            }
            }).catch(error => {
                setErrorMessage(error.error); 
            });
    }else if(tOrF === false){
        getShoppingCart().then(storedShoppingCart => {
            if (storedShoppingCart.hasOwnProperty(productName)) {
                storedShoppingCart[productName]['number']=storedShoppingCart[productName]['number']-1;
                if(storedShoppingCart[productName]['number']===0){
                    delete storedShoppingCart[productName];
                }
                postShoppingCart(storedShoppingCart).then(storedShoppingCart => {
                    setShoppingCart(storedShoppingCart);
                    }).catch(error => {
                        setErrorMessage(error.error); 
                    });
            }
            }).catch(error => {
                setErrorMessage(error.error); 
            });
    }
  };
  const handleProducts= (id, product) => {
    setErrorMessage('');
    postCertainProducts(id, product).then(products => {
        setProducts(products);
        return products
        }).catch(error => {
            setErrorMessage(error.error); 
        });
  };
  
  const handleNumberOfItemsShoppingCart= (number) => {
    setErrorMessage('');
    postNumberOfItemsShoppingCart(number).then(data => {
        setNumberOfItemsShoppingCart(number);
        return number
        }).catch(error => {
            setErrorMessage(error.error); 
        });
  };

  const handlePriceInShoppingCart= (number) => {
    setErrorMessage('');
    postPriceInShoppingCart(number).then(data => {
        setPriceInShoppingCart(number);
        return number
        }).catch(error => {
            setErrorMessage(error.error); 
        });
  };
  
  const handleMessages= (message) => {
    setErrorMessage('');
    let user = username;
    if(AdministratorSelectedUser != '' && username==='manager'){
      user = AdministratorSelectedUser;
    }
    if(AdministratorSelectedUser === '' && username==='manager'){
      user = message.user;
    }
    postMessage(user, message).then(data => {
        getMessage(user).then(newMessage => {
            setMessages(newMessage);
            }).catch(error => {
                setErrorMessage(error.error); 
            });
        }).catch(error => {
            setErrorMessage(error.error); 
        });
  };

  const handleOrders= (id, oder) => {
    setErrorMessage('');
    postOder(id, oder).then(data => {
        getAllOder().then(allOder => {
            setOrders(allOder);
            }).catch(error => {
                setErrorMessage(error.error); 
            });
        }).catch(error => {
            setErrorMessage(error.error); 
        });
  };

  const handleOrdersStatus= (orderId, oderStatus, cancelReason) => {
    let changedOder=orders[orderId];
    changedOder["oderStatus"]=oderStatus;
    postOder(orderId,changedOder).then(data => {
        getAllOder().then(allOder => {
            setOrders(allOder);
            }).catch(error => {
                setErrorMessage(error.error); 
            });
        }).catch(error => {
            setErrorMessage(error.error); 
        });
    if(cancelReason != undefined){
        handleMessages(undefined);
    }
  }

  return (
    <div className="div">
      {currentPage === 'userLogin' && <UserLogin  onLogin={handleLogin}  onPageChange={handlePageChange}/>}
      {currentPage === 'userHomePage' && <UserHomePage username={username} onLogout={handleLogout} onPageChange={handlePageChange}/>}
      {currentPage === 'userAccountInformation' && <UserAccountInformation username={username} storedAddress={address} order={orders}
      onUpdateAddress={handleAddress} stroedMembership={membership} storedAccountDeposit={accountDeposit} stroedOrderQuantity={orderQuantity} storedUserOrder={userOrder} onPageChange={handlePageChange}/>}
      {currentPage === 'userMall' && <UserMall username={username} storedMoney={accountDeposit} onUpdateMoney={handleAccountDeposit} storedMembershipStatus={membership} 
      shoppingCart={shoppingCart} onUpdatedShoppingCart={handleShoppingCart} onUpdatedUserOrder={handleUserOrder} 
      stroedOrderQuantity={orderQuantity} onUpdatedOrderQuantity={handleOrderQuantity} onUpdatedOrder={handleOrders} products={products} 
      storedNumberOfItemsShoppingCart={numberOfItemsShoppingCart} onUpdatedNumberOfItemsShoppingCart={handleNumberOfItemsShoppingCart}
      storedPriceInShoppingCart={priceInShoppingCart} onUpdatedPriceInShoppingCart={handlePriceInShoppingCart} onPageChange={handlePageChange} storedAddress={address}/>}
      {currentPage === 'userWallet' && <UserWallet username={username} storedMoney={accountDeposit} onUpdateMoney={handleAccountDeposit} storedMembershipStatus={membership}
      onChangeMembershipStatus={handleMembership} onPageChange={handlePageChange}/>}
      {currentPage === 'userMessages' && <UserMessages username={username} messages={messages} onUpdatedMessages={handleMessages} onPageChange={handlePageChange}/>}

      {currentPage === 'managerLogin' && <ManagerLogin onLogin={handleLogin} onPageChange={handlePageChange}/>}
      {currentPage === 'managerHomePage' && <ManagerHomePage username={username} onLogout={handleLogout} onPageChange={handlePageChange}/>}
      {currentPage === 'orderManagement' && <OrderManagement username={username} onPageChange={handlePageChange} orders={orders} onUpdateOderStatus={handleOrdersStatus} onUpdatedMessages={handleMessages}/>}
      {currentPage === 'productManagement' && <ProductManagement username={username} onPageChange={handlePageChange} products={products} manageProductStatus={handleProducts}/>}
      {currentPage === 'userManagement' && <UserManagement username={username} userList={userList} onPageChange={handlePageChange} setAdministratorSelectedUser={setAdministratorSelectedUser} />}
      {currentPage === 'chatWithUser' && <ChatWithUser  username={username} messages={messages} onUpdatedMessages={handleMessages} onPageChange={handlePageChange} administratorSelectedUser={AdministratorSelectedUser}/>}
      {errorMessage && <p className="hint">{errorMessage}</p>}
    </div>
  );
};
export default App;
