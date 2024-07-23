const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [],
            agendaSlug: "developers" // Agenda inicial.
        },
        actions: {
            agenda: (agendaName) => {
                fetch(`https://playground.4geeks.com/contact/agendas/${agendaName}/contacts`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(resp => {
                    if (!resp.ok) {
                        if (resp.status === 404) {
                            throw new Error('La agenda no existe');
                        }
                        throw new Error('Error al obtener los contactos');
                    }
                    return resp.json();
                })
                .then(data => {
                    console.log('Datos recibidos:', data);
                   
                })
                .catch(error => {
                    console.error('Error al obtener los contactos:', error.message);
                    if (error.message === 'La agenda no existe') {
                 
                    } else {
        
                    }
                });
            },

            getContacts: () => {
                const store = getStore();
                return fetch(`https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(resp => {
                    if (!resp.ok) {
                        throw new Error('Error al obtener los contactos');
                    }
                    return resp.json();
                })
                .then(data => {
                    console.log('Contactos obtenidos:', data);
                    setStore({ contacts: data.contacts });

                    // Mostrar mensaje si no hay contactos disponibles
                    if (data.contacts.length === 0) {
                        console.log('No hay contactos disponibles.');
                    }
                })
                .catch(error => {
                    console.error("Error al obtener los contactos:", error);
                    throw error;
                });
            },

            createAgenda: (agendaName) => {
                return fetch(`https://playground.4geeks.com/contact/agendas/${agendaName}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({})
                })
                .then(resp => {
                    if (!resp.ok) {
                        throw new Error('Error al crear la agenda');
                    }
                    return resp.json();
                })
                .then(data => {
                    console.log(`Agenda creada:`, data);
                    console.log('Añadir contactos a esta agenda.'); // Mostrar mensaje de añadir contactos
                    return data; 
                })
                .catch(error => {
                    console.error("Error al crear la agenda:", error.message);
                    if (error.message.includes("doesn't exist")) {
                        console.error("La agenda no existe.");
                    }
                    throw error;
                });
            },

            createContact: (agendaSlug, contactData) => {
                fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: contactData.name,
                        email: contactData.email,
                        phone: contactData.phone,
                        address: contactData.address
                    })
                })
                .then(resp => {
                    if (!resp.ok) {
                        throw new Error('Error al crear el contacto');
                    }
                    return resp.json();
                })
                .then(newContact => {
                    console.log('Contacto creado:', newContact);
                    getActions().getContacts(); // Actualiza automáticamente los contactos después de agregar uno nuevo
                })
                .catch(error => {
                    console.error("Error al crear el contacto:", error.message);
                    if (error.message.includes("doesn't exist")) {
                        console.error("La agenda no existe.");
                    }
                });
            },

            updateContact: (agendaSlug, contactId, updatedContactData) => {
                return fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts/${contactId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedContactData)
                })
                .then(resp => {
                    if (!resp.ok) {
                        throw new Error('Error al actualizar el contacto');
                    }
                    return resp.json();
                })
                .then(updatedContact => {
                    console.log('Contacto actualizado:', updatedContact);
                    return updatedContact; 
                })
                .catch(error => {
                    console.error("Error al actualizar el contacto:", error.message);
                    throw error; 
                });
            },
            

            deleteContact: (agendaSlug, contactId) => {
                return fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts/${contactId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al eliminar el contacto');
                    }
                    console.log('Contacto eliminado exitosamente');
                    getActions().getContacts(); // Actualiza automáticamente los contactos después de eliminar uno
                })
                .catch(error => {
                    console.error('Error al eliminar el contacto:', error);
                
                });
            },
            

            getUserOrCreate: (username) => {
                return fetch(`https://playground.4geeks.com/contact/agendas/${username}`)
                .then(resp => {
                    if (resp.status === 404) {
                        // Crear una nueva agenda si no existe
                        return fetch(`https://playground.4geeks.com/contact/agendas/${username}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({})
                        })
                        .then(resp => {
                            if (!resp.ok) {
                                throw new Error('Error al crear la agenda');
                            }
                            return resp.json();
                        });
                    } else if (!resp.ok) {
                        throw new Error('Error al obtener la agenda');
                    }
                    return resp.json();
                })
                .then(data => {
                    if (data.slug) {
                        console.log(`Agenda encontrada o creada: ${data.slug}`);
                        setStore({ agendaSlug: data.slug });

                        // Verificar si la agenda tiene contactos
                        if (data.contacts.length === 0) {
                            console.log('No hay contactos disponibles.');
                        }

                        getActions().getContacts(); // Llama a la función para obtener contactos
                    } else {
                        console.error("Error al obtener o crear la agenda:", data);
                    }
                })
                .catch(error => console.error("Error al obtener o crear la agenda:", error));
            }
        }
    };
};

export default getState;
