import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Characters } from "./Characters.jsx";
import { Planets } from "./Planets.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
        <>
            <Characters />
            <Planets /> 

           

        </>
    );
};




