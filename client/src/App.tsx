import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import GlobalStyleProvider from 'assets/styles/globalStyles';

import { JoinContextProvider } from 'context/joinContext';
import LoginPage from 'pages/LoginPage';
import ChatPage from 'pages/ChatPage';
import JoinPage from 'pages/JoinPage';

import PrivateRoute from 'authentication/PrivateRoute';
import CheckRoute from 'helpers/CheckRoute';

const App = () => {
  return (
    <GlobalStyleProvider>
      <JoinContextProvider>
        <Router>
          <Switch>
            <CheckRoute exact path="/" component={LoginPage} />
            <PrivateRoute path="/room" component={ChatPage} />
            <PrivateRoute path="/join/:key/:roomName" component={JoinPage} />
          </Switch>
        </Router>
      </JoinContextProvider>
    </GlobalStyleProvider>
  );
};

export default App;
