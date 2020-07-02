import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuthentication from 'authentication/authenticationHooks';

enum authenicationProgress {
  loading = 'loading',
  confirmed = 'confirmed',
  unconfirmed = 'unconfirmed',
  error = 'error',
}

const CheckRoute = ({ component, ...rest }: any) => {
  const { isUserLogin } = useAuthentication();

  const Comp = React.createElement(component);

  if (isUserLogin === authenicationProgress.confirmed) {
    return <Redirect to="/room" />;
  }

  if (isUserLogin === authenicationProgress.error) {
    return <Route {...rest} render={() => Comp} />;
  }

  return <h1>weryfikacja</h1>;
};

export default CheckRoute;
