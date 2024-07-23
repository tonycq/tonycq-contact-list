import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil, faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Modal from './modal';
import { useNavigate } from 'react-router-dom';

const ContactCard = ({ contact, onDelete }) => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleDeleteClick = () => {
        if (typeof onDelete === 'function') {
            onDelete(contact.id);
            setShowModal(false);
        } else {
            console.error('onDelete is not a function');
        }
    };

    const handleEditClick = () => {
        navigate(`/editContact/${contact.id}`);
    };

    return (
        <div className="card mb-3" style={{ maxWidth: '100%' }}>
            <div className="row g-0">
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <img src="https://via.placeholder.com/150" className="img-fluid rounded-circle" alt="Contact" />
                </div>
                <div className="col-md-9">
                    <div className="card-body d-flex flex-column justify-content-center">
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="card-title mb-0">{contact.name}</h5>
                            <div>
                                <FontAwesomeIcon icon={faPencil} className="me-3" style={{ cursor: 'pointer', color: 'green' }} onClick={handleEditClick} />
                                <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer', color: 'red' }} onClick={() => setShowModal(true)} />
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="card-text mb-1">
                                <FontAwesomeIcon icon={faLocationDot} className="me-2" />
                                {contact.address}
                            </p>
                            <p className="card-text mb-1">
                                <FontAwesomeIcon icon={faPhone} className="me-2" />
                                {contact.phone}
                            </p>
                            <p className="card-text mb-0">
                                <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                                {contact.email}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDeleteClick}
                title={`¿Estás seguro de eliminar a ${contact.name}?`}
                body="Esta acción no se puede deshacer."
                confirmText="Eliminar"
                cancelText="Cancelar"
            />
        </div>
    );
};

export default ContactCard;
