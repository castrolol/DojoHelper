( function () {
	var React = require( 'react' ),
		Router = require( 'react-router' ),
		routes = require( './view/routes');

	var remote = window.require( 'remote' );


	window.React = React;
 
	Router.run(routes, function (Handler) {
	  React.render(<Handler/>, document.body);
	});

} )(); 