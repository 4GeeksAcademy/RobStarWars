import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Characters = () => {
    const {store } = useContext(Context)
    
  

    return (
        <div>
           
                <h1 className="text-center">Characters</h1>
            <div className="row m-auto justify-content-center gap-3 overflow-x-scroll">
                {store.characters.map((item, index) => (
                    <div className="card" style={{ width: "18rem" }} key={index}>
                        <img src={`https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <span className="card-text">Gender: {item.gender}</span><br />
                            <span className="card-text">Hair color: {item.hair_color}</span><br />
                            <span className="card-text">Eye color: {item.eye_color}</span><br />
                            <Link to={`details/${item.id}`} className="btn btn-primary mt-2">Más Info</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
