import React from 'react';
import './Box.css';

const Box = ({symbol, onClickHandle}) => {
	if(symbol === null){
		symbol = <span className="empty">?</span>;
	}
	// let player = symbol === null? {<span> </snap>}  : symbol;
	return (
		<div className="box" onClick={() => onClickHandle()}>{symbol}</div>
	);
}


export default Box;