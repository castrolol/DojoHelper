import React from "react"
import AppBar from "./app-bar" 
import {Page} from './components' 
import {Hub} from 'react-winjs'
import ipc from 'ipc'
import dojoHandler from '../dojo-handler'

var LockView = React.createClass({
 
	getInitialState: function () {
	    return {
	        titulo: "",
	        subtitulo: "",
	        piloto: null,
	        copiloto: null,
	    };
	},

	componentDidMount() {
	    
		ipc.on('update-lock-screen',  () => {

			var newState = dojoHandler.escolherProximos();
			console.log(newState);
			this.setState(newState);

		});

	},

	handleComecar(){

		ipc.send('show-timer-popup');
	},

	render(){

		let pilotoElement = null;
		let copilotoElement = null;

		if(this.state.piloto){
			pilotoElement = (
				<div className="win-hub-piloto" >
					<h2>{'Numero ' + this.state.piloto}</h2>
					<h5>Píloto</h5>
				</div>
			);
		}


		if(this.state.copiloto){
			copilotoElement = (
				<div className="win-hub-piloto" >
					<h2>{'Numero ' + this.state.copiloto}</h2>
					<h5>Co-piloto</h5>
				</div>
			);
		}

		return (
			<Hub style={{width: "100%"}} className="hub-lock-screen">
				<Hub.Section
                    key="sectionA"
                    header={this.state.titulo}
                    style={{width: "100%"}}
                    isHeaderStatic={true}>

                    	<div className="win-hub-message">
                    		<div className="subtitle">{this.state.subtitulo}</div>
 							
	 						<h2 className="proximo">Próximos:</h2>
 							 							
 							{pilotoElement}
 							{copilotoElement}

 							<div className="win-hub-buttons">
 								<button onClick={this.handleComecar} >
 									Começar!
 								</button>
 							</div>
 						</div>
                </Hub.Section>
			</Hub>
		);

	}

});

module.exports = LockView;