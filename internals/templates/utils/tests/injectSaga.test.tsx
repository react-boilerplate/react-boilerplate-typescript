/**
 * Test injectors
 */

import * as React from 'react';

import { put } from 'redux-saga/effects';
import { shallow } from 'enzyme';


import configureStore from '../../configureStore';
import { createMemoryHistory } from 'history';
import { DAEMON } from '../constants';

const memoryHistory = createMemoryHistory();

// Fixtures
const Component = () => null;

function* testSaga() {
  yield put({ type: 'TEST', payload: 'yup' });
}

describe('injectSaga decorator', () => {
  let store;
  let injectors;
  let ComponentWithSaga;
  let injectSaga;

  beforeAll(() => {
    jest.mock('../sagaInjectors', () => ({
      __esModule: true,
      default: jest.fn().mockImplementation(() => injectors),
    }));

    injectSaga = require('../injectSaga').default;
  });

  beforeEach(() => {
    store = configureStore({}, memoryHistory);
    injectors = {
      injectSaga: jest.fn(),
      ejectSaga: jest.fn(),
    };
    ComponentWithSaga = injectSaga({
      key: 'test',
      saga: testSaga,
      mode: DAEMON,
    })(Component);
    jest.unmock('../sagaInjectors');
  });

  it('should inject given saga, mode, and props', () => {
    const props = { test: 'test' };
    shallow(<ComponentWithSaga {...props} />, { context: { store: store } });

    expect(injectors.injectSaga).toHaveBeenCalledTimes(1);
    expect(injectors.injectSaga).toHaveBeenCalledWith(
      'test',
      { saga: testSaga, mode: DAEMON },
      props,
    );
  });

  it('should eject on unmount with a correct saga key', () => {
    const props = { test: 'test' };
    const renderedComponent = shallow(<ComponentWithSaga {...props} />, {
      context: { store: store },
    });
    renderedComponent.unmount();

    expect(injectors.ejectSaga).toHaveBeenCalledTimes(1);
    expect(injectors.ejectSaga).toHaveBeenCalledWith('test');
  });

  it('should set a correct display name', () => {
    expect(ComponentWithSaga.displayName).toBe('withSaga(Component)');
    expect(
      injectSaga({ key: 'test', saga: testSaga })(() => null).displayName,
    ).toBe('withSaga(Component)');
  });

  it('should propagate props', () => {
    const props = { testProp: 'test' };
    const renderedComponent = shallow(<ComponentWithSaga {...props} />, {
      context: { store: store },
    });

    expect(renderedComponent.prop('testProp')).toBe('test');
  });
});
