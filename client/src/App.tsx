import React from 'react';
import { HashRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';

import './styles.css';

import GlobalStyleProvider from 'assets/styles/globalStyles';
import { ViewContextProvider } from 'context/viewsContext';
import PrivateRoute from 'authentication/PrivateRoute';
import CheckRoute from 'helpers/CheckRoute';
import BottomMenu from 'components/BottomMenu'

import { bottomMenuRouters, mainRouters } from 'Routers'

import JoinPage from 'pages/JoinPage';


const TestComponent = () => <h1>Hello it's me</h1>

const App = () => {
  return (
    <GlobalStyleProvider>
      <ViewContextProvider>
        <Router>
          <Switch>
            <Route component={TestComponent} path="/test"/>
            {
              mainRouters.map(({ isPrivate, Component, exact, path }: { isPrivate: boolean, path: string, Component: any, exact: boolean }) => {
                if (isPrivate) {
                  return <PrivateRoute path={path} component={Component} exact={exact} key={path}/>
                } 
                return <CheckRoute path={path} component={Component} exact={exact} key={path}/>
              })
            }
            <Route>
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
            </Route>            
          </Switch>
        </Router>
        <BrowserRouter>
          <PrivateRoute path="/join/:key/:roomName/:type?" component={JoinPage} exact={true} />
        </BrowserRouter>
      </ViewContextProvider>
    </GlobalStyleProvider>
  );
};

export default App;
