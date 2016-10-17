import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import createStore from "./store";
import {theme} from "./styles";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import HomeMaster from "@modules/home/HomeMaster";
import Home from "@modules/home/Home";
import Project from "@modules/project/Project";
import Audit from "@modules/audit/Audit";
import Console from "@modules/console/Console";
import Dashboard from "@modules/dashboard/Dashboard";
import Account from "@modules/account/Account";
import CreateProject from "@modules/create-project/CreateProject";
import Log from '@modules/log/Log';
import NotFound from '@modules/not-found/NotFound';

// Needed for onTouchTap http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
render(
  <Provider store={createStore()}>
    <MuiThemeProvider muiTheme={theme}>
      <Router history={browserHistory}>
        <Route path="/" component={HomeMaster}>
          <IndexRoute component={Home}/>
        </Route>
        <Route path="/console" component={Console}>
          <IndexRoute component={Dashboard}/>
          <Route path="/console/account" component={Account}/>
          <Route path="/console/add" component={CreateProject}/>
          <Route path="/console/:projectId" component={Project}/>
          <Route path="/console/:projectId/log" component={Log}/>
          <Route path="/console/:projectId/:date" component={Audit}/>
        </Route>
        <Route path="*" status={404} component={NotFound}/>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
