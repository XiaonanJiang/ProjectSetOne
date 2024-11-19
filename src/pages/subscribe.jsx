import React from "react";

const Subscribe = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <dialog open id="modal" className="modal">
            <div className="modal-content">
              <h2>Login to Subscribe</h2>
              <form id="login-form">
                <div>
                  <label htmlFor="email">Email:</label>
                  <input type="text" id="email" name="email" />
                </div>

                <div>
                  <label htmlFor="confirm-email">Confirm Email:</label>
                  <input type="text" id="confirm-email" name="confirm-email" />
                </div>

                <div>
                  <button type="submit">Subscribe</button>
                  <button onClick={onClose}>
                    Close
                  </button>
                </div>
              </form>
              <div id="error-message" className="error-message"></div>
          </div>
    </dialog>
  );
};

export default Subscribe;