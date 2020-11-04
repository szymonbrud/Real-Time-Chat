import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuthentication from 'authentication/useAuthenticationHooks';

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
    return <Redirect to="/messagesChat" />;
  }

  if (isUserLogin === authenicationProgress.error || isUserLogin === authenicationProgress.unconfirmed) {
    return <Route {...rest} render={() => Comp} />;
  }

  return <h1>weryfikacja</h1>;
};

export default CheckRoute;
