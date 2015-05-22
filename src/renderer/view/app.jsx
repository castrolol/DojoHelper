import React from "react";
import AppBar from "./app-bar";
import {default as Router, RouteHandler, Navigation} from 'react-router';
 
var AppView = React.createClass({

	mixins: [Navigation],

	getMenuItems(){

		return [
			{
				label: "Iniciar um Dojo",
				icon: "webcam",
				route: "dojo"
			},
			{
				label: "Ajustes",
				icon: "settings",
				route: "ajustes"
			}
		];
	},


	handleNavigate(route, option){
		
		this.transitionTo(route);

	},

	render(){

		return (<AppBar options={this.getMenuItems()} onNavigate={this.handleNavigate} >
					<RouteHandler /> 
				</AppBar>);

	}

});

module.exports = AppView;