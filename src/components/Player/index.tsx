import React from "react";
import "./index.css";
import { Player } from "types/player";


interface props {
    player: Player;
}

const PlayerComponent: React.FC<props> = ({ player }) => {
    return (
        <div style={{ position: "absolute", transform: `rotate(${player.rotation}deg)`, top: `${player.position.y}px`, left: `${player.position.x}px` }}>
            <p style={{textAlign: "center"}}>{player.name}</p>
            <img alt="player" className="player" src="https://cdn.pixabay.com/photo/2016/09/01/08/24/smiley-1635449_1280.png" />
        </div>
    )
}

export default PlayerComponent;