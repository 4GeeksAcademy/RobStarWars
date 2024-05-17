import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Planets = () => {


const { store } = useContext(Context)

return (<>

    <div className="row m-auto justify-content-center gap-3">
        <h1 className="text-center mt-4">Planets</h1>
        {store.planets.map((item, index) => (
            <div className="card" style={{ width: "18rem" }} key={index}>
                <img src={`https://starwars-visualguide.com/assets/img/planets/${index + 1}.jpg`} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <span className="card-text">Gender: {item.population}</span><br />
                    <span className="card-text">Hair color: {item.terrain}</span><br />
                    <span className="card-text">Eye color: {item.climate}</span><br />
                    <Link to={`/${item.id}`} className="btn btn-primary mt-2">Más Info</Link>
                </div>
            </div>
        ))}
    </div>

</>
);

}