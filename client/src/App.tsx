import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyleProvider from 'assets/styles/globalStyles';

import { JoinContextProvider } from 'context/joinContext';
import LoginPage from 'pages/LoginPage';
import ChatPage from 'pages/ChatPage';

const App = () => (
  <GlobalStyleProvider>
    <JoinContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/room" component={ChatPage} />
        </Switch>
      </Router>
    </JoinContextProvider>
  </GlobalStyleProvider>
);

export default App;
