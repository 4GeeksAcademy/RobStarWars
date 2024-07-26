import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Planets = () => {


const { store, actions } = useContext(Context)

const handleImageError = (event) => {
    event.target.src = "https://pbs.twimg.com/media/CqAE488UAAAeoX7.jpg"; 
};

return (<>

    <div className="row m-auto justify-content-center gap-3" >
        <h1 className="text-center mt-4">Planets</h1>
        {store.planets.map((item, index) => (
            <div className="card" style={{ width: "18rem" }} key={index}>
                <img src={`https://starwars-visualguide.com/assets/img/planets/${index + 1}.jpg`} className="card-img-top" alt="..." 
                onError={handleImageError} />
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <span className="card-text">Gender: {item.population}</span><br />
                    <span className="card-text">Hair color: {item.terrain}</span><br />
                    <span className="card-text">Eye color: {item.climate}</span><br />
                    <div className="d-flex justify-content-between align-items-center">
                                <Link to={'/planet-details/' + index} onClick={() => actions.setCurrentItem(item)} className="btn btn-primary mt-2">Más Info</Link>
                        <i className="fa-solid fa-heart btn btn-danger" style={{width: "40px", height: "30px"}}
                                   onClick={() => actions.addFavorites(item.name)}></i>
                            </div>
                    
                </div>
            </div>
        ))}
    </div>

</>
);

}
