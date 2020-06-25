import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import GlobalStyleProvider from 'assets/styles/globalStyles';
import { JoinContextProvider, setUsernameAndRoom } from 'context/joinContext';

import LoginPage from './index';

jest.mock('../../context/joinContext/index.tsx');

afterEach(() => {
  jest.clearAllMocks();
});

// TODO: Write helper that have GlobalStyle, JOinContext, RouterSwitch

const DefaultComponent = ({ children }) => (
  <GlobalStyleProvider>
    <JoinContextProvider>
      <Router>
        <Switch>{children}</Switch>
      </Router>
    </JoinContextProvider>
  </GlobalStyleProvider>
);

describe('Are input correctly completed', () => {
  it('After click button when input are correctly should call function', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <DefaultComponent>
        <LoginPage />
      </DefaultComponent>,
    );

    fireEvent.change(getByPlaceholderText('nazwa'), { target: { value: 'marcin' } });
    fireEvent.change(getByPlaceholderText('pokój'), { target: { value: '01' } });

    fireEvent.click(getByText('gotowe'));

    expect(queryByText('Błąd!')).toBeNull();
    expect(setUsernameAndRoom.mock.calls.length).toBe(1);
  });

  it('After click buttonw when inputs are NOT corrently should NOT call function', () => {
    const { getByPlaceholderText, getByText, getAllByText } = render(
      <DefaultComponent>
        <LoginPage />
      </DefaultComponent>,
    );

    fireEvent.change(getByPlaceholderText('nazwa'), { target: { value: '' } });
    fireEvent.change(getByPlaceholderText('pokój'), { target: { value: '01' } });

    fireEvent.click(getByText('gotowe'));

    expect(getByText('Błąd!')).toBeDefined();
    expect(setUsernameAndRoom.mock.calls.length).toBe(0);

    fireEvent.change(getByPlaceholderText('nazwa'), { target: { value: 'marcin' } });
    fireEvent.change(getByPlaceholderText('pokój'), { target: { value: '' } });

    fireEvent.click(getByText('gotowe'));

    expect(getByText('Błąd!')).toBeDefined();
    expect(setUsernameAndRoom.mock.calls.length).toBe(0);

    fireEvent.change(getByPlaceholderText('nazwa'), { target: { value: '' } });
    fireEvent.change(getByPlaceholderText('pokój'), { target: { value: '' } });

    fireEvent.click(getByText('gotowe'));

    expect(setUsernameAndRoom.mock.calls.length).toBe(0);
  });
});
