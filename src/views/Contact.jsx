import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../stored/appContext";
import ContactCard from "../componentes/ContactCard";

const Contact = () => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [agendaName, setAgendaName] = useState("");

    useEffect(() => {
        const fetchContacts = async () => {
            if (store.agendaSlug) {
                try {
                    console.log(`Obteniendo contactos para la agenda: ${store.agendaSlug}`);
                    await actions.getContacts();
                    setLoading(false);
                } catch (error) {
                    console.error("Error al obtener contactos:", error);
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchContacts();
    }, [store.agendaSlug]);

    const handleCreateOrGetAgenda = () => {
        if (agendaName.trim() !== "") {
            setLoading(true);
            actions.getUserOrCreate(agendaName)
                .catch(error => {
                    console.error("Error al crear o obtener la agenda:", error);
                    setLoading(false);
                });
        }
    };

    const handleInputChange = (event) => {
        setAgendaName(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleCreateOrGetAgenda();
        }
    };

    const handleDelete = async (contactId) => {
        try {
            await actions.deleteContact(store.agendaSlug, contactId);
            await actions.getContacts();
        } catch (error) {
            console.error("Error al eliminar contacto:", error);
        }
    };

    const handleUpdate = async (contactId, updatedContactData) => {
        try {
            await actions.updateContact(store.agendaSlug, contactId, updatedContactData);
            await actions.getContacts(); // Actualiza la lista de contactos después de la edición
        } catch (error) {
            console.error("Error al actualizar contacto:", error);
        }
    };

    if (loading) {
        return <p>Cargando contactos...</p>;
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <div style={{ maxWidth: '500px', width: '100%' }}>
                <div className="text-center mb-3">
                    <input 
                        type="text" 
                        placeholder="Ingrese nombre de la agenda" 
                        value={agendaName} 
                        onChange={handleInputChange} 
                        onKeyPress={handleKeyPress} 
                        className="form-control mb-2"
                    />
                    <button onClick={handleCreateOrGetAgenda} className="btn btn-primary w-100">
                        Crear/Obtener Agenda
                    </button>
                </div>
                <div className="text-center mb-3">
                    <Link to="/addContact" className="btn btn-primary w-100">
                        Añadir nuevo contacto
                    </Link>
                </div>
                <div>
                    {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
                        store.contacts.map(contact => (
                            <ContactCard 
                                key={contact.id} 
                                contact={contact} 
                                onDelete={handleDelete} 
                                onUpdate={handleUpdate} // Pasar la función de actualización al componente ContactCard
                            />
                        ))
                    ) : (
                        <p>No hay contactos disponibles.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;
