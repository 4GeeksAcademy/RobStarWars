import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop.js";
import { BackendURL } from "./component/backendURL.js";

import { Home } from "./pages/Home.jsx";

import { Single } from "./pages/single.js";
import injectContext from "./store/appContext.js";

import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/footer.js";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx"
import { CharacterDetails } from "./pages/CharacterDetails.jsx";
import { PlanetDetails } from "./pages/PlanetDetails.jsx";
import { Contact } from "./pages/Contact.jsx"

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    // if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Contact />} path="/contacts" />
                        <Route element={<CharacterDetails />} path='/character-details/:characterid' />
                        <Route element={<PlanetDetails />} path='/planet-details/:planetid' />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
