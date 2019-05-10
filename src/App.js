import React, { Component } from "react";
import Button from "./components/Button";
import Board from "./components/Board";
import Player from "./components/Player";
import "./App.css";
import "./components/Player.css";
import Particles from 'react-particles-js';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			board: Array(9).fill(null),
			player: null,
			player1: null,
			winner: null,
			resetBtn: false,
			tie:false,
			moves: Array()
		};
	}

	onClickHandle = index => {
		if (!this.state.board[index] && !this.state.winner) {
			const symbol = this.state.player === "🐸" ? "🦊" : "🐸";

			let newBoard = this.state.board;
			newBoard[index] = this.state.player;
			const addMove = this.state.moves;
			addMove.push(index);
			this.setState({
				board: newBoard,
				player: symbol,
				moves: addMove
			});

			this.getWinner();
		}
	};

	choosePlayer = symbol => {
		if (this.state.player === null) {
			this.setState({
				player: symbol,
				player1: symbol
			});
		}
	};

	getWinner = () => {
		const winStates = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];
		for (let i = 0; i < winStates.length; i++) {
			const [a, b, c] = winStates[i];
			if (
				this.state.board[a] != null &&
				this.state.board[a] === this.state.board[b] &&
				this.state.board[a] === this.state.board[c]
			) {
				this.setState({
					winner: this.state.player,
					player: this.state.player,
					resetBtn: true
				});
				return;
			}
		}

		const res = this.state.board.filter(c => c === null);
		if (res.length < 1) {
			this.setState({
				resetBtn: true,
				tie:true
			});
			
			return;
		}
	};

	onReset = () => {
		this.setState({
			board: Array(9).fill(null),
			player: this.state.player1,
			winner: null,
			resetBtn: false,
			tie:false,
			moves: Array()
		});
	};

	onUndo = () => {
		if (this.state.moves.length > 0) {
			const newBoard = this.state.board;
			const newMoves = this.state.moves;
			const index = newMoves.pop();

			const player = newBoard[index];
			newBoard[index] = null;

			this.setState({
				board: newBoard,
				player: player,
				moves: newMoves
			});
		}
	};

	backToGame = () => {		
		this.setState({ tie: false, moves: Array() });
	};

	getGame = () => {
		const p2 = this.state.player1 === "🐸" ? "🦊" : "🐸";
		if (this.state.winner !== null && this.state.moves.length > 0) {
			return (
				<div className="container">
					<h4 className="player">Winner is {this.state.winner}</h4>
					<Button
						btnName="Click To Continue"
						btnClass="myButton"
						onReset={() => this.backToGame()}
					/>
				</div>
			);
		}
		if (this.state.tie) {
			return (
				<div className="container">
					<h4 className="player">{this.state.player1} It's a tie {p2}</h4>
					<Button
						btnName="Click To Play Again"
						btnClass="myButton"
						onReset={() => this.backToGame()}
					/>
				</div>
			);
		}
		let animate1 =
			this.state.player !== p2 && this.state.winner === null
				? "player animate"
				: "player";
		let animate2 =
			this.state.player === p2 && this.state.winner === null
				? "player animate"
				: "player";
		let game = "";
		let reset = "";

		if (this.state.resetBtn) {
			reset = (
				<Button
					btnName="Reset"
					btnClass="myButton"
					onReset={this.onReset}
				/>
			);
		} else if (this.state.moves.length > 0) {
			reset = (
				<Button
					btnName="Undo"
					btnClass="myButton"
					onReset={this.onUndo}
				/>
			);
		}

		if (this.state.player === null) {
			game = (
				<div className="container">
					<Player choosePlayer={this.choosePlayer} />
				</div>
			);
		} else {
			game = (
				<div className="game">
					<div>
						<span className={animate1}>{this.state.player1}</span>
						<br />
						Player 1
					</div>
					<div className="container">
						<h1>Welcome to Tic Tac Toe!</h1>
						<Board
							board={this.state.board}
							onClickHandle={this.onClickHandle}
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
	};

	

	render() {

		const partConfig = {
	    "particles": {
	        "number": {
	            "value": 200,
	            "density": {
	                "enable": false
	            }
	        },
	        "size": {
	            "value": 500,
	            "random": true
	        },
	        "move": {
	            "direction": "bottom",
	            "out_mode": "out"
	        },
	        "line_linked": {
	            "enable": false
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onclick": {
	                "enable": true,
	                "mode": "remove"
	            }
	        },
	        "modes": {
	            "remove": {
	                "particles_nb": 1000
	            }
	        }
	    }
	};
		
		return <div>
		<Particles className="particles"
    params={this.partConfig} />
		{this.getGame()}
		</div>;
	}
}

export default App;
