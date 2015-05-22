( function () {
	var React = require( 'react' ),
		LockView = require( './view/lock');

	var remote = window.require( 'remote' );


	window.React = React;
 
	
	React.render(<LockView/>, document.body);
	

} )(); 