import React from 'react';
import "./Player.css";

const Player = ({choosePlayer}) => {
	return (
		<div>
			<h3>Please Choose your Player</h3>
			<label  className="player space" onClick={() => choosePlayer(`🐸`)}>🐸</label>
			<label className="player space" onClick={() => choosePlayer(`🦊`)}>🦊</label>
		</div>
		);
}

export default Player