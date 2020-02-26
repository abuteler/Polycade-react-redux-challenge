import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { List } from 'immutable';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { initialState } from '../reducers/machines.reducer';
import { Health } from './Health';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const machine = {"id":"4111947a-6c58-4977-90fa-2caaaef88648","name":"Machine 2","ip_address":"127.0.0.4","health":62};
const machinesMock = [
  {"id":"99ade105-dee1-49eb-8ac4-e4d272f89fba","name":"Machine 1","ip_address":"127.0.0.31","health":64},
  {"id":"4111947a-6c58-4977-90fa-2caaaef88648","name":"Machine 2","ip_address":"127.0.0.4","health":62}
];
const machinesList = List();

describe('Health Component', () => {

  test('component renders', () => {
    const getMachineByIdMockFn = jest.fn();
    const { getByTestId } = render(<Health getMachineById={getMachineByIdMockFn} id={machine.id} machines={machinesList} machine={machine} />);
    const element = getByTestId('health-component');
    expect(element).toBeInTheDocument();
  });

  test('component renders with title if showTitle prop is true', () => {
    const getMachineByIdMockFn = jest.fn();
    const { getByTestId } = render(<Health showTitle={true} getMachineById={getMachineByIdMockFn} id={machine.id} machines={machinesList} machine={machine} />);
    const element = getByTestId('health-component-title');
    expect(element).toBeInTheDocument();
  });

  test('component should get machine details if not in machines view', () => {
    const getMachineByIdMockFn = jest.fn();
    const { getByTestId } = render(<Health getMachineById={getMachineByIdMockFn} id={machine.id} machines={machinesList} machine={machine} />);
    expect(getMachineByIdMockFn.mock.calls.length).toBe(1)
  });
  
  test('component should not get machine details if in machines view', () => {
    const getMachineByIdMockFn = jest.fn();
    machinesList.push(machinesMock)
    const { getByTestId } = render(<Health getMachineById={getMachineByIdMockFn} id={machine.id} machines={machinesList} machine={machine} />);
    expect(getMachineByIdMockFn.mock.calls.length).toBe(1)
  });

});
