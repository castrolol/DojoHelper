import React from "react/addons";
import {Page} from "../components"
import formHelper from '../../helper/form-helper'
import dojoHandler from '../../dojo-handler'

var DojoPage = React.createClass({
	mixins: [React.addons.LinkedStateMixin],

	getInitialState () {

	    return {
			numParticipantes: 5,	
			minutos: 5,	
		};
	},
	
	shouldComponentUpdate (nextProps, nextState) {
	    nextState.numParticipantes = formHelper.ensureIsNumber(nextState.numParticipantes, 3);
	    nextState.minutos = formHelper.ensureIsNumber(nextState.minutos, 1, 15);
	    return true;
	},

	handleDojoClick(){
	 
		dojoHandler.iniciarDojo(this.state.numParticipantes, this.state.minutos);

	},

	render(){ 
		var handleKeys = (f) => formHelper.handleKeysInNumber(this, f);
		var link = this.linkState;
	 

		return (
			<Page >				
				<div className="win-dojo-page"> 
					<h3> Quantos Participantes ?</h3>
					<label>
						<input 
							placeholder="Linguagem" 						 
							className="num-input"
							onKeyDown={handleKeys("numParticipantes")} 
							valueLink={link("numParticipantes")}  />				
							<span>
								participantes
							</span>
					</label>

					<h3> Quanto Tempo entre as trocas ?</h3>
					<label>
						<input 
							placeholder="Linguagem" 
							className="num-input"
							onKeyDown={handleKeys("minutos")} 
							valueLink={link("minutos")}  />	
							<span>
								{this.state.minutos > 1 ? "minutos" : "minuto"}
							</span>
					</label>

					<div className="btn-wrapper" >
						<button onClick={this.handleDojoClick}  >
							Iniciar Dojo!
						</button>
					</div>
				</div>
			</Page>
		);

	}

});

export default DojoPage;
