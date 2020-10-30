import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './styles.css';

import GlobalStyleProvider from 'assets/styles/globalStyles';
import { ViewContextProvider } from 'context/viewsContext';
import PrivateRoute from 'authentication/PrivateRoute';
import CheckRoute from 'helpers/CheckRoute';
import BottomMenu from 'components/BottomMenu'

import { bottomMenuRouters, mainRouters } from 'Routers'

const App = () => {
  return (
    <GlobalStyleProvider>
      <ViewContextProvider>
        <Router>
          <Switch>
            {
              mainRouters.map(({ isPrivate, Component, exact, path }: { isPrivate: boolean, path: string, Component: any, exact: boolean }) => {
                if (isPrivate) {
                  return <PrivateRoute path={path} component={Component} exact={exact} key={path}/>
                } 
                return <CheckRoute path={path} component={Component} exact={exact} key={path}/>
              })
            }
            <PrivateRoute>
              <BottomMenu/>
              {
                bottomMenuRouters.map(({ isPrivate, path, Component, exact }:
                  { isPrivate: boolean, path: string, Component: any, exact: boolean }) => {
                    if (isPrivate) {
                      return <PrivateRoute path={path} component={Component} exact={exact} key={path}/>
                    }
                    return <Route path={path} component={Component} exact={exact} key={path}/>
                  })
                }
            </PrivateRoute>            
          </Switch>
        </Router>
      </ViewContextProvider>
    </GlobalStyleProvider>
  );
};

export default App;
