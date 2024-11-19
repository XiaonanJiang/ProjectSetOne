import React, { useState } from "react";
import Cat from "./pages/cat.jsx";
import Index from "./pages/index.jsx";
import Event from "./pages/event.jsx";
import Button from "./pages/button.jsx";


function App() {
  const [currentPage, setCurrentPage] = useState("index");
  const openWebsite = (url) => {
    window.open(url, "_blank"); 
  };

  const renderPage = () => {
    if (currentPage === "index") return <Index />;
    if (currentPage === "cat") return <Cat />;
    if (currentPage === "event") return <Event />;
  };

  return (
    <div id="about-page">
  <header>    
  <div className="logo-title">
    <a href="index.html">
      <img src="/logo.jpeg" className="logo" alt="A random picture on unsplash, which I used as a logo"/>
    </a>
      
      <h1 className="header-text">Cat Power the Internet</h1>
  </div>
  <nav>
      <div className="mobile-menu">☰
      <ul className="menu">
          <button className="menu-item" onClick={() => setCurrentPage("index")}>Home</button>
          <button className="menu-item" onClick={() => setCurrentPage("cat")}>Famous Cat</button>
          <button className="menu-item" onClick={() => setCurrentPage("event")}>Cats Event</button>
          </ul>
      </div>
      <ul className="menu">
          <button className="menu-item" onClick={() => setCurrentPage("index")}>Home</button>
          <button className="menu-item" onClick={() => setCurrentPage("cat")}>Famous Cat</button>
          <button className="menu-item" onClick={() => setCurrentPage("event")}>Cats Event</button>
      </ul>
</nav>
</header>
  <main>
    {renderPage()}
    </main>
<footer>
  <div className="footer-link">
      <Button 
          type="button" 
          visual="link" 
          onClick={() => openWebsite("https://en.wikipedia.org/wiki/Privacy_policy")}>
          Privacy Policy
      </Button>
      <Button 
          type="button" 
          visual="button" 
          onClick={() => openWebsite("https://en.wikipedia.org/wiki/Work")}>
          Work for Us
      </Button>
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          openWebsite("https://www.github.com");
        }}>
          <Button type="submit" visual="link">
             Contact Us
          </Button>
        </form>
      </div>
  </div>
</footer>
</div>
  );
}

export default App;