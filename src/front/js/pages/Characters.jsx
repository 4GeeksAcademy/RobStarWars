import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Characters = () => {
    const { store, actions } = useContext(Context); // Asegúrate de obtener actions aquí
    
    const handleAddFavorite = async (characterId) => {
        try {
            const userId = store.currentUser;  
            
            // Verifica que userId esté definido
            if (!userId) {
                alert("No user is logged in.");
                return;
            }

            const response = await fetch(`${process.env.BACKEND_URL}/api/favorites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ favorited_by_id: userId, character_id: characterId })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            await actions.updateFavorites(); // Llama a la función para actualizar favoritos
            
            alert("Favorite added successfully!");
        } catch (error) {
            console.error('Error adding favorite:', error);
            alert("Failed to add favorite.");
        }
    };

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
                            <div className="d-flex justify-content-between align-items-center">
                                <Link to={'/character-details/' + index} onClick={() => actions.setCurrentItem(item)} className="btn btn-primary mt-2">Más Info</Link>
                                <i className="fa-solid fa-heart btn btn-danger" style={{width: "40px", height: "30px"}}
                                   onClick={() => handleAddFavorite(index )}></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
