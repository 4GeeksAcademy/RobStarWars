import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Contact = () => {
  const { store, actions } = useContext(Context);
  const [contacts, setContacts] = useState([]);
  const [pageAction, setPageAction] = useState(true);
  const [pageEdit, setPageEdit] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const host = `${process.env.BACKEND_URL}`;

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    try {
      const uri = `${host}/api/contacts`;
      const options = { method: 'GET' };
      const response = await fetch(uri, options);

      if (!response.ok) {
        console.log("Error", response.status, response.statusText);
        return;
      }

      const data = await response.json();
      setContacts(data.results);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleSubmitContact = async () => {
    try {
      const contactData = { fullname: name, phone, address, email };
      const uri = `${host}/api/contacts`;
      const options = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      };
      const response = await fetch(uri, options);

      if (!response.ok) {
        console.log("Error", response.status, response.statusText);
        return;
      }

      const result = await response.json();
      console.log("Contacto añadido", result);

      setName("");
      setPhone("");
      setAddress("");
      setEmail("");

      getContacts();
      setPageAction(true);
    } catch (error) {
      console.error("Error submitting contact:", error);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();

    console.log("Current Contact before PUT request:", currentContact);

    try {
      const dataToSend = {
        fullname: currentContact.fullname,
        phone: currentContact.phone,
        address: currentContact.address,
        email: currentContact.email,
      };

      const uri = `${host}/api/contacts/${currentContact.id}`;
      const options = {
        method: 'PUT',
        body: JSON.stringify(dataToSend),
        headers: { 'Content-Type': 'application/json' },
      };

      const response = await fetch(uri, options);

      if (!response.ok) {
        console.log("Error", response.status, response.statusText);
        return;
      }

      getContacts();

      setCurrentContact(null);
      setPageEdit(false);
    } catch (error) {
      console.error("Error editing contact:", error);
    }
  };

  const deleteContact = async (item) => {
    try {
      const uri = `${host}/api/contacts/${item.id}`;
      const options = { method: 'DELETE' };
      const response = await fetch(uri, options);

      if (!response.ok) {
        console.log("Error", response.status, response.statusText);
        return;
      }
      getContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const editContact = (item) => {
    setCurrentContact({ ...item });
    setPageEdit(true);
  };

  return (
    <div>
      <div className="d-flex justify-content-end mx-3 my-3">
        <Link to="/adminpanel"><button className="admin-button">Admin Panel</button></Link>
      </div>
      <div className="d-flex justify-content-center mx-auto my-5">
        <div className="btn-group" role="group" aria-label="Basic outlined example" style={{ width: "20%" }}>
          <button
            type="button"
            className={`btn btn-outline-primary comic-button dual ${pageAction ? "actual" : ""}`}
            onClick={() => setPageAction(true)}
          >
            Ver listado
          </button>
          <button
            type="button"
            className={`btn btn-outline-primary comic-button dual ${!pageAction ? "actual" : ""}`}
            onClick={() => setPageAction(false)}
          >
            Crear nuevo
          </button>
        </div>
      </div>
      {pageAction ? (
        <>
          <h3 className="text-center">Lista</h3>
          <div className="mx-5 d-flex justify-content-center">
            <ul className="list-group" style={{ width: "60%" }}>
              {contacts.map((item) => (
                <li key={item.id} className="list-group-item border border-top-0 border-end-0 border-3 border-bottom-2 border-start-1 mb-2">
                  {!pageEdit || (currentContact && currentContact.id !== item.id) ? (
                    <>
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <div>
                            <span>
                              <strong>Nombre: </strong>{item.fullname},
                              <strong> Teléfono: </strong>{item.phone},
                              <strong> Email: </strong>{item.email},
                            </span>
                          </div>
                          <div>
                            <span>{item.address}</span>
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="mx-3">
                            <i className="fa-solid fa-pencil pointer" onClick={() => editContact(item)}></i>
                          </div>
                          <div>
                            <i className="fa-solid fa-trash pointer" onClick={() => deleteContact(item)}></i>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    currentContact && currentContact.id === item.id && (
                      <div className="d-block w-100">
                        <div className="d-flex">
                          <input
                            type="text"
                            placeholder="name"
                            value={currentContact.fullname}
                            className="flex-input"
                            style={{ width: "60%" }}
                            onChange={(event) => setCurrentContact({ ...currentContact, fullname: event.target.value })}
                          />
                          <input
                            type="text"
                            placeholder="phone"
                            value={currentContact.phone}
                            className="flex-input"
                            style={{ width: "30%" }}
                            onChange={(event) => setCurrentContact({ ...currentContact, phone: event.target.value })}
                          />
                        </div>
                        <div>
                          <textarea
                            className="form-control"
                            aria-label="With textarea"
                            placeholder="Dirección"
                            value={currentContact.address}
                            onChange={(event) => setCurrentContact({ ...currentContact, address: event.target.value })}
                          ></textarea>
                        </div>
                        <div className="justify-content-center d-flex mt-1">
                          <button className="rounded-3 bg-light" onClick={handleEdit}>Enviar</button>
                        </div>
                      </div>
                    )
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-center my-4">Añadir contacto</h3>
          <div className="container-fluid d-flex justify-content-center" style={{ width: "60%" }}>
            <div className="w-100">
              <label className="mb-1" htmlFor="contact-name">Nombre del contacto</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend"></div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <label className="mb-1" htmlFor="contact-phone">Teléfono</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend"></div>
                <input
                  type="text"
                  className="form-control"
                  id="contact-phone"
                  placeholder="Número"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <label className="mb-1" htmlFor="contact-email">Email</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend"></div>
                <input
                  type="text"
                  className="form-control"
                  id="contact-email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <label className="mb-1" htmlFor="contact-address">Dirección</label>
              <div className="input-group">
                <div className="input-group-prepend"></div>
                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  id="contact-address"
                  placeholder="Añada una dirección"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>
              <div className="d-flex justify-content-center mt-3">
                <button className="rounded-3 bg-light" onClick={handleSubmitContact}>Enviar</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
