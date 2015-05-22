( function () {
	var React = require( 'react' ),
		TimerView = require( './view/timer');

	var remote = window.require( 'remote' );


	window.React = React;
 
	
	React.render(<TimerView/>, document.body);
	

} )();  