import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Details = () => {

    const { store } = useContext(Context);

    const params = useParams();
    const characterId = parseInt(params.characterid, 10);
    const character = store.characters[characterId];

<div>
<div class="card text-center">
    <div class="card-header">
       <h1> {character.gender}</h1>
    </div>
    <div class="card-body d-flex">
        <div>
            <img src="" />
        </div>
        <div>
            <ul class="list-group list-group-flush text-start">
                <li class="list-group-item">Height:  </li>
                <li class="list-group-item">Mass: </li>
                <li class="list-group-item">Hair color:</li>
                <li class="list-group-item">Skin color:</li>
                <li class="list-group-item">Birth year: </li>
                <li class="list-group-item">Gender: </li>
                <li class="list-group-item">Planet: </li>
            </ul>
        </div>
    </div>
    <div class="card-footer text-body-secondary">
        2 days ago
    </div>
</div>
</div>
};