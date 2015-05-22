import BrowserWindow from 'browser-window'
import {EventEmitter} from 'events'
import app from 'app'
import ipc from 'ipc'

export default class WindowHandler extends EventEmitter {

	constructor(){
		super(); 
		this.mainWindow = null;
		this.timeWindow = null;
		this.lockWindow = null;
		this.bindEvents();
	}

	createAllWindows(){
		this.createMainWindow();
		this.createTimeWindow();
		this.createLockWindow();
	}

	bindEvents(){


		//redirect the dojo for all windows
		ipc.on('send-dojo', (ev, mensagem) => {
			this.lockWindow.webContents.send('receive-dojo', mensagem);
			this.timeWindow.webContents.send('receive-dojo', mensagem);
			this.mainWindow.webContents.send('receive-dojo', mensagem);
		});

		ipc.on('show-lock-screen', (ev, mensagem) => {

			this.mainWindow.hide();
			this.timeWindow.hide();
			
			this.lockWindow.webContents.send('update-lock-screen');
			this.lockWindow.show();
			this.lockWindow.setFullScreen(true);

		});

		ipc.on('show-timer-popup', (ev, mensagem) => {

			
			this.lockWindow.setFullScreen(false);
			this.lockWindow.setKiosk(false);
			this.mainWindow.hide();
			this.lockWindow.hide();
			this.timeWindow.webContents.send('receive-dojo', mensagem);
			this.timeWindow.webContents.send('update-timer-screen');

			this.timeWindow.show();
		});
	}

	createMainWindow(){

		this.mainWindow = new BrowserWindow( {
			width: 550,
			height: 630,
			'min-width': 550,
			'min-height': 630,
			frame: false

		});

		this.mainWindow.loadUrl( 'file://' + __dirname + '/../html/main.html' );
		this.mainWindow.on( 'closed', () => {
			this.mainWindow = null;
			app.quit();
		}); 
		

	}

	createTimeWindow(){
		this.timeWindow = new BrowserWindow( {
			width: 250,
			height: 150,
			'min-width': 250,
			'min-height': 150,
			'max-width': 250,
			'max-height': 150,
			frame: false,
			show: false,
			'always-on-top': true
		} );
		this.timeWindow.loadUrl( 'file://' + __dirname + '/../html/timer.html' );
		this.timeWindow.on( 'closed', () => {
			this.timeWindow = null;
			app.quit();
		} ); 
		 
	}



	createLockWindow(){
		
		this.lockWindow = new BrowserWindow( {
			kioski: true,
			frame: false,
			show: false,
			'always-on-top': true
		} );

		this.lockWindow.loadUrl( 'file://' + __dirname + '/../html/lock.html' );
		this.lockWindow.on( 'closed', () => {
			this.lockWindow = null;
			app.quit();
		} );  
	}


}


