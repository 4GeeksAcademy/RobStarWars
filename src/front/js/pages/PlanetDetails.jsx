import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const PlanetDetails = () => {
    const { store } = useContext(Context);
    const { planetid } = useParams();

    const planet = store.planets[planetid];

    if (!planet) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="card text-center">
                <div className="card-header">
                    <h1>{planet.name}</h1>
                </div>
                <div className="card-body d-flex">
                    <div>
                        <img src={`https://starwars-visualguide.com/assets/img/planets/${parseInt(planetid) + 1}.jpg`} alt={planet.name} />
                    </div>
                    <div>
                        <ul className="list-group list-group-flush text-start">
                            <li className="list-group-item">Diameter: {planet.diameter}</li>
                            <li className="list-group-item">Gravity: {planet.gravity}</li>
                            <li className="list-group-item">Climate: {planet.climate}</li>
                            <li className="list-group-item">Population: {planet.population}</li>
                            <li className="list-group-item">Terrain: {planet.terrain}</li>
                        </ul>
                    </div>
                </div>
                <div className="card-footer text-body-secondary">
                    2 days ago
                </div>
            </div>
        </div>
    );
};
