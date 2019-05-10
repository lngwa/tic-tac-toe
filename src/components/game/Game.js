import React from 'react';
import Board from './Board';
import Button from './Button';
import Player from './Player';

const Game = ({state, backToGame, onClickHandle, onUndo,onReset, choosePlayer}) => {
	const {winner, tie, moves, board, player1, player, resetBtn} = state;
	const p2 = player1 === "🐸" ? "🦊" : "🐸";
		if (winner !== null && moves.length > 0) {
			return (
				<div className="container">
					<h4 className="player">Winner is {winner}</h4>
					<Button
						btnName="Click To Continue"
						btnClass="myButton"
						onReset={backToGame}
					/>
				</div>
			);
		}
		if (tie) {
			return (
				<div className="container">
					<h4 className="player">{player1} It's a tie {p2}</h4>
					<Button
						btnName="Click To Play Again"
						btnClass="myButton"
						onReset={backToGame}
					/>
				</div>
			);
		}
		let animate1 =
			player !== p2 && winner === null
				? "player animate"
				: "player";

		let animate2 =
			player === p2 && winner === null
				? "player animate"
				: "player";

		let game = "";
		let reset = "";

		if (resetBtn) {
			reset = (
				<Button
					btnName="Reset"
					btnClass="myButton"
					onReset={() => onReset}
				/>
			);
		} else if (moves.length > 0) {
			reset = (
				<Button
					btnName="Undo"
					btnClass="myButton"
					onReset={onUndo}
				/>
			);
		}

		if (player === null) {
			game = (
				<div className="container">
					<Player choosePlayer={choosePlayer} />
				</div>
			);
		} else {
			game = (
				<div className="game">
					<div>
						<span className={animate1}>{player1}</span>
						<br />
						Player 1
					</div>
					<div className="container">
						<h1>Welcome to Tic Tac Toe!</h1>
						<Board
							board={board}
							onClickHandle={onClickHandle}
						/>
						<div>
							<br />
							<hr />
							{reset}
						</div>
					</div>
					<div>
						<span className={animate2}>{p2}</span>
						<br />
						Player 2
					</div>
				</div>
			);
		}
		return game;
	
}


export default Game;