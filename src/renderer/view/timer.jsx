import React from "react"
import {Page} from './components' 
import ipc from 'ipc'
import remote from 'remote';
import screenRef from 'screen';
import dojoHandler from '../dojo-handler'

let rem = remote;
let win = remote.getCurrentWindow(); 

function getWindow(){
	return win;
}

function getScreen(){
	return screenRef;
}

var TimerView = React.createClass({
 
	getInitialState () {
	    return {
	       minutos: null,
	       segundos: null,
	       position: 'bottom-right'
	    };
	},

	componentDidMount () {

		ipc.on('update-timer-screen', (dateString) => {

			var nextStop = dojoHandler.proximaParada();
			var diference = nextStop - new Date();
			this.setState({
				segundos: Math.floor(diference / 1000) % 60,
				minutos: Math.floor(diference / 60000)
			});

		});

		this.updateTimer();

	},

	updateTimer(){
		
		setTimeout(this.updateTimer, 1000);
		if(this.state.minutos == null || this.state.segundos == null) return;

		var novoSegundos = this.state.segundos - 1;
		var novoMinutos = this.state.minutos
		if(novoSegundos < 0 ){
			novoMinutos -= 1;
			novoSegundos = 59;
		}

		if(novoMinutos < 0){
			novoMinutos = null;
			novoSegundos = null;
			ipc.send("show-lock-screen");
		}

		this.setState({
			segundos: novoSegundos,
			minutos: novoMinutos
		});

	},

	handlePosition(){
	 		
		var position = { x: 20, y: 20};

		if(this.state.position == 'bottom-right'){

			var screenSize =  getScreen().getPrimaryDisplay().workAreaSize;
			var actualSize = getWindow().getContentSize();
		
			position = { 
				x: screenSize.width - (actualSize[0] + 20),
				y: screenSize.height - (actualSize[1] + 20)
			};	
 
		}

		getWindow().setPosition(position.x, position.y);

	},

	handleMouseOver(){ 

		var inBottom = this.state.position == 'bottom-right';

		this.setState({
			position: inBottom ? 'up-left' : 'bottom-right'
		});
	
	},
 
	render(){

		this.handlePosition();

		var segundos = this.state.segundos || 0;
		if(segundos.toString().length < 2) segundos = "0" + segundos;

		return (
			<div className="win-timer-page" onMouseOver={this.handleMouseOver} >
				<span>{this.state.minutos || 0}</span>
				<span>:</span>
				<span>{segundos}</span>				
			</div>
		);

	}

});

module.exports = TimerView;