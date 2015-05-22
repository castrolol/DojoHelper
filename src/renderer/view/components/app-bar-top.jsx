import React from 'react';
import {NavBarCommand} from 'react-winjs';
import remote from 'remote';

let rem = remote;
let win = remote.getCurrentWindow(); 

function getWindow(){

	return win;
}

export default class AppBarTop extends React.Component {

	constructor(props){
		super(props);


		this.state = { isMaximized: getWindow().isMaximized() };
		this.props = {title: ""};

		setInterval(() =>{

			try{
				this.setState({
					isMaximized: getWindow().isMaximized()
				});
			}catch(e){

			}

		}, 1000);
 
	}

	handleClose(){
		getWindow().close();
	}

	handleMaximize(){
		if(this.state.isMaximized){
			getWindow().unmaximize();
		}else{
			getWindow().maximize();
		}
	}

    render() { 

    	 
        return (
           <div>
	            <div className="win-app-bar">
	            	<h2 className="win-app-bar-title">{this.props.title}</h2>
	            	
	            	<div className="win-app-bar-buttons">
	            		<NavBarCommand 
	            			className="win-app-bar-button"
	            			icon="cancel"
	            			onClick={() => this.handleClose()}
	            			/>
	            		<NavBarCommand 
	            			className="win-app-bar-button"
	            			icon={this.state.isMaximized ? 'backtowindow' : 'fullscreen'} 
	            			onClick={() => this.handleMaximize()} 
	            			/>
	            	</div>
	            </div>
	            <div>
	            	{this.props.children}
	            </div>
            </div>
        );
    }
}