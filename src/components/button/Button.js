import React from 'react';
import "./Button.css";

const Button = ({btnClass, btnName, onReset}) => {	
	return (
		<button className={btnClass} onClick={() => onReset()}>{btnName}</button>
		);
}

export default Button;