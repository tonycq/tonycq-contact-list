import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../stored/appContext";

const AddContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (isEditing) {
            const contact = store.contacts.find(contact => contact.id === parseInt(id));
            if (contact) {
                setFormData(contact);
            }
        }
    }, [id, isEditing, store.contacts]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            actions.updateContact(store.agendaSlug, id, formData);
        } else {
            actions.createContact(store.agendaSlug, formData);
        }
        navigate("/");
    };

    return (
        <>
            <h2 className="fw-bold text-center py-5">
                {isEditing ? "Editar Contacto" : "Añadir un Nuevo Contacto"}
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre Completo</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Nombre completo"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Teléfono</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        placeholder="Teléfono"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Dirección</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Dirección"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
            <Link to="/" className="col">Volver a contactos</Link>
        </>
    );
};

export default AddContact;
