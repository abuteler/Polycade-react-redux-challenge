import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import App from './App';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('App', () => {

  test('renders Home link', () => {
    const initialState = {};
    const { getByText } = render(<App store={mockStore(initialState)} />);
    const linkElement = getByText(/Home/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders /machines link', () => {
    const initialState = {};
    const { getByText } = render(<App store={mockStore(initialState)} />);
    const linkElement = getByText(/Machines/i);
    expect(linkElement).toBeInTheDocument();
  });
})

