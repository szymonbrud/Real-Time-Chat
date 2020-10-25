import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyleProvider from 'assets/styles/globalStyles';

import './styles.css';

import { JoinContextProvider } from 'context/joinContext';
import { ViewContextProvider } from 'context/viewsContext';
import LoginPage from 'pages/LoginPage';
import ChatPage from 'pages/ChatPage';
import JoinPage from 'pages/JoinPage';

import PrivateRoute from 'authentication/PrivateRoute';
import CheckRoute from 'helpers/CheckRoute';

import BottomMenu from 'components/BottomMenu'

import Routers from 'Routers'

const App = () => {
  return (
    <GlobalStyleProvider>
      <ViewContextProvider>
        <Router>
          <Switch>
            <CheckRoute exact path="/" component={LoginPage} />
            <PrivateRoute path="/room" component={ChatPage} />
            <>
              <BottomMenu/>
              {
                Routers.map(({ isPrivate, path, Component, exact }:
                  { isPrivate: boolean, path: string, Component: any, exact: boolean }) => {
                    if (isPrivate) {
                      return <PrivateRoute path={path} component={Component} exact={exact}/>
                    }
                    return <Route path={path} component={Component} exact={exact}/>
                  })
                }
            </>            
            <PrivateRoute path="/join/:key/:roomName" component={JoinPage} />
          </Switch>
        </Router>
      </ViewContextProvider>
    </GlobalStyleProvider>
  );
};

export default App;
