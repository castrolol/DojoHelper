import crashReporter from  'crash-reporter'
import WindowHandler from './window-handler'
import app from 'app'

crashReporter.start();

export default class MainApp {

	constructor(){		
		this.windowHandler = new WindowHandler();
	}

	init(){
		
		this.bindEvents();

	}

	bindEvents(){
		

		app.on( 'window-all-closed', () => {
			if ( process.platform !== 'darwin' ) app.quit();
		} );

		app.on( 'ready', () => {			
			this.windowHandler.createAllWindows();
		} );

	}


}


