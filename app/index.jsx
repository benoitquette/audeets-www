import React from "react";
import {createRoot} from 'react-dom/client';
import {Provider} from "react-redux";
import createStore from "./store";
import {theme} from "./styles";
import {ThemeProvider} from '@mui/material/styles';
import Home from "@modules/home/Home";
import Project from "@modules/project/Project";
import Audit from "@modules/audit/Audit";
import Console from "@modules/console/Console";
import Dashboard from "@modules/dashboard/Dashboard";
import Account from "@modules/account/Account";
import CreateProject from "@modules/create-project/CreateProject";
import Log from '@modules/log/Log';
import NotFound from '@modules/not-found/NotFound';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <Provider store={createStore()}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/console">
            <Console>
              <Switch>
                <Route path="/console/dashboard">
                  <Dashboard/>
                </Route>
                <Route path="/console/account">
                  <Account/>
                </Route>
                <Route path="/console/add">
                  <CreateProject/>
                </Route>
                <Route exact path="/console/:projectId">
                  <Project/>
                </Route>
                <Route exact path="/console/:projectId/log">
                  <Log/>
                </Route>
                <Route exact path="/console/:projectId/:date">
                  <Audit/>
                </Route>
              </Switch>
            </Console>
          </Route>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/404">
            <NotFound/>
          </Route>
          <Route path="*">
            <Redirect to="/404"/>
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
