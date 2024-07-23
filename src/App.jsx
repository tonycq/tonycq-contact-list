import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./views/Contact";
import injectContext from "./stored/appContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddContact from "./views/AddContact";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/addContact" element={<AddContact />} />
                <Route path="/" element={<Contact />} />
                <Route path="/editContact/:id" element={<AddContact />} />
            </Routes>
        </BrowserRouter>
    );
};

export default injectContext(App);



