import React from 'react';
import { ExitToAppRounded } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';
import { Redirect } from 'react-router-dom';

import { WrapperButton } from './styles';

const LeaveButton = ({ diconnect }: { diconnect: Function }) => {
  const [isRedirect, setIsRedirect] = React.useState(false);

  const leave = () => {
    diconnect();
    setIsRedirect(true);
  };

  if (isRedirect) {
    return <Redirect to="/" />;
  }

  return (
    <WrapperButton onClick={leave}>
      <ExitToAppRounded style={{ fontSize: 27, color: grey[50], marginTop: 1 }} />
    </WrapperButton>
  );
};

export default LeaveButton;
