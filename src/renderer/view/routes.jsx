import React from 'react';
import {Route, DefaultRoute, NotFoundRoute, Redirect} from 'react-router';
import AppView from './app';

import Dojo from './pages/dojo';
import Ajustes from './pages/ajustes';
 
var routes = (
  <Route handler={AppView} path="/">
    <DefaultRoute handler={Dojo} />
    <Route name="dojo" path="dojo" handler={Dojo} />
    <Route name="ajustes" path="ajustes" handler={Ajustes} />
    <NotFoundRoute handler={Dojo}/>
  </Route>
);

export default routes;