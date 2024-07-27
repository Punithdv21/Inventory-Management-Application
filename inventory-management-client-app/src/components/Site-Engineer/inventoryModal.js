import React from 'react';
import '../Site-Engineer/inventoryModal.css';

const Modal = ({ isOpen, onRequestClose, children }) => {
    if (!isOpen) return null; // Check for isOpen prop

    return (
        <div className="modal-overlay" onClick={onRequestClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onRequestClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
