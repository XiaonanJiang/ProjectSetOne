import React, { useState } from "react";
import Subscribe from "./subscribe.jsx";
import "./cat.css";


export default function Cat() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true); 
    const closeModal = () => setIsModalOpen(false); 
  return <div id="homepage">
<main>
  <h2 className="main-title">This is the sth about cats</h2>
  <div className="sections">
      <section className="section-one">
          <img className="page-image" src="/A.jpeg" alt="A random cat picture"/>
          <h3>First Card</h3>
          <p>This is some descriptive text</p>
          <button className="subscribe-button" onClick={openModal}>
              Subscribe
            </button>
      </section>

      <section className="section-two">
          <img className="page-image" src="/B.jpeg" alt="A random cat picture"/>
          <h3>Second Card</h3>
          <p>This is also a descriptive text. It needs to be long enough to ensure
              that it is different in length from the first card's descriptive text.</p>
              <button className="subscribe-button" onClick={openModal}>
              Subscribe
            </button>
      </section>

      <section className="section-three">
          <img className="page-image" src="/C.jpeg" alt="A random cat picture"/>
          <h3>Third Card</h3>
          <p>This is the descriptive text for part 3. I'm going to use a long, 
              horrible paragraph of nonsense to keep it from being the same length 
              through the nonsense so that no one can spot the logical errors in it.</p>
              <button className="subscribe-button" onClick={openModal}>
              Subscribe
            </button>
      </section>
  </div>


  <div className="sections-another">
      <section className="section-four">
          <img className="page-image" src="/D.jpeg" alt="A random cat picture"/>
          <h3>Fourth Card</h3>
          <p>This is some descriptive text, it describes a bunch of cats</p>
          <button className="subscribe-button" onClick={openModal}>
              Subscribe
            </button>
      </section>

      <section className="section-five">
          <img className="page-image" src="/E.jpeg" alt="A random cat picture"/>
          <h3>Fifth Card</h3>
          <p>Lots of cats</p>
          <button className="subscribe-button" onClick={openModal}>
              Subscribe
            </button>
      </section>

      <section className="section-six">
          <img className="page-image" src="/F.jpeg" alt="A random cat picture"/>
          <h3>Sixth Card</h3>
          <p>Cat God, please bless me to finish my homework on time </p>
          <button className="subscribe-button" onClick={openModal}>
              Subscribe
            </button>
      </section>
  </div>
  <Subscribe isOpen={isModalOpen} onClose={closeModal} />
</main>
</div>;
}
