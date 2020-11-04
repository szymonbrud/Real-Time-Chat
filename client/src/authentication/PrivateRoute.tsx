import React from 'react';
import { Route } from 'react-router-dom';
import useAuthentication from 'authentication/useAuthenticationHooks';

import LoginPage from 'pages/LoginPage';

enum authenicationProgress {
  loading = 'loading',
  confirmed = 'confirmed',
  unconfirmed = 'unconfirmed',
  error = 'error',
}

const PrivateRoute = ({ component, ...rest }: any) => {
  const { isUserLogin } = useAuthentication();

  const Comp = React.createElement(component);

  if (isUserLogin === authenicationProgress.confirmed) {
    return <Route {...rest} render={() => Comp} />;
  }

  if (isUserLogin === authenicationProgress.error || isUserLogin === authenicationProgress.unconfirmed) {
    return <LoginPage />;
  }

  return <h1>weryfikacja</h1>;
};

export default PrivateRoute;
