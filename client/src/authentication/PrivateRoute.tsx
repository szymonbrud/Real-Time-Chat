import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuthentication from 'authentication/authenticationHooks';

import LoginPage from 'pages/LoginPage';
import { render } from '@testing-library/react';

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

  if (isUserLogin === authenicationProgress.error) {
    return <LoginPage />;
  }

  return <h1>weryfikacja</h1>;
};

export default PrivateRoute;
