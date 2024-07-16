import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CharacterDetails = () => {
    const { store } = useContext(Context);
    const { characterid } = useParams();

    const character = store.characters[characterid];

    if (!character) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="card text-center">
                <div className="card-header">
                    <h1>{character.name}</h1>
                </div>
                <div className="card-body d-flex">
                    <div>
                        <img src={`https://starwars-visualguide.com/assets/img/characters/${parseInt(characterid) + 1}.jpg`} alt={character.name} />
                    </div>
                    <div>
                        <ul className="list-group list-group-flush text-start">
                            <li className="list-group-item">Height: {character.height}</li>
                            <li className="list-group-item">Mass: {character.mass}</li>
                            <li className="list-group-item">Hair color: {character.hair_color}</li>
                            <li className="list-group-item">Skin color: {character.skin_color}</li>
                            <li className="list-group-item">Gender: {character.gender}</li>
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
