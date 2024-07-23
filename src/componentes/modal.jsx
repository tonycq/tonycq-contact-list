import React from 'react';
// Importa la biblioteca PropTypes para definir y validar los tipos de las propiedades que recibe el componente
import PropTypes from 'prop-types';

const Modal = ({ show, onClose, onConfirm, title, body, confirmText, cancelText }) => {
    if (!show) {
        return null;
    }
    

    return (
        <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>{body}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>{cancelText}</button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>{confirmText}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Define las PropTypes para el componente Modal
Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    confirmText: PropTypes.string.isRequired,
    cancelText: PropTypes.string.isRequired,
};

export default Modal;
