import React from 'react';
import {shallow, render} from 'enzyme';

//Test Component
import Player from './Player'
import App from '../../containers/app/App'




describe(`Player Component test`, () => {
	
	it("should return Please Choose your Player for the title", () => {
		const wrapper = shallow(<Player choosePlayer={alert()} />);
		const two = wrapper.find('h3').text();
		expect(two).toBe("Please Choose your Player");
	});
})