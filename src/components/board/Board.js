import React from 'react';
import "./Board.css";
import Box from "../box/Box";

const Board = ({board, onClickHandle}) => {
	const boxes = board.map((player, index) => {
			return (
				<Box key={index} symbol={player} onClickHandle={() => onClickHandle(index)} />
			);
		});
		return <div className="board">{boxes}</div>;
}

export default Board;