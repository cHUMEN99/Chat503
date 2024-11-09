// Modal.js
import React from 'react';
import '../styles/Modal.css';

const Modal = ({ show, closemodal, children }) => {
  if (!show ) return null; // якщо show === false, модальне вікно не відображається

  return (
    <div className="modal-backdrop" onClick={closemodal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closemodal}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
