import ipc from 'ipc'
import arrayHelper from './helper/array-helper'

class DojoHandler {


	constructor(){

		this.configurarEventos();
		this.intervalo = 0;
		this.participantes = [];
		this.trocas = 0;
		this.piloto = null;
		this.copiloto = null;
		this.atual = {};
		this.semParticiparAinda = [];
		this.jaParticiparam = [];
	}


	configurarEventos(){

		ipc.on('receive-dojo', (msg) => {
			this.load(msg);
		});

	}

	serialize(){
		
		return JSON.stringify(this);
	}

	load(json){
		
		var obj = JSON.parse(json);
		for(var property in obj){
			this[property] = obj[property];
		}
	}

	iniciarDojo(participantes, tempo){
		this.intervalo = tempo;

		this.participantes = [];

		for(let i = 0; i < participantes; i++){
			this.participantes.push(i + 1);
		}

		this.semParticiparAinda = this.participantes.slice();
		this.jaParticiparam = [];

		//this.escolherProximos();

		var atualJson =  JSON.stringify(this.atual);


		ipc.send('send-dojo', this.serialize());
		ipc.send('show-lock-screen', atualJson);

	}	

	getMensagem(){
		console.log(this.trocas);
		if(this.trocas){
			return {
				titulo: "Acabou!...",
				subtitulo: "Agora vamos trocar ai galera"
			};
		}else{
			return {
				titulo: "Prontos...?",
				subtitulo: "Ao seus postos..."
			}
		}

	}

	iniciarTimer(){

		ipc.send('send-dojo', this.serialize());
		ipc.send('show-timer-popup', atualJson);

	}

	proximaParada(){

		return new Date(Date.now() + (this.intervalo * 60 * 1000));

	}

	escolherProximos(){

		let excluidos = [this.piloto, this.copiloto];

		let participante = arrayHelper.removeRandomly(this.semParticiparAinda, excluidos)[0];
		this.jaParticiparam.push(participante);

		if(!this.semParticiparAinda.length){
			this.semParticiparAinda = this.jaParticiparam;
			this.jaParticiparam = [];
		}

		this.piloto = this.copiloto;
		this.copiloto = participante;

		if(!this.piloto){
			return this.escolherProximos();
		}

		
		var retorno = this.getMensagem();
		retorno.copiloto = this.copiloto;
		retorno.piloto = this.piloto;

		this.atual = retorno;
		this.trocas++;

		return retorno;

	}

}

export default new DojoHandler();