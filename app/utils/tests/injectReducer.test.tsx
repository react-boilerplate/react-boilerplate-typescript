/**
 * Test injectors
 */

import * as React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { render } from 'react-testing-library';

import configureStore from '../../configureStore';
import { useInjectReducer } from '../injectReducer';

// Fixtures
const Component = () => null;

const reducer = s => s;

import { createMemoryHistory } from 'history';

const memoryHistory = createMemoryHistory();

describe('injectReducer decorator', () => {
  let store;
  let injectors;
  let ComponentWithReducer;
  let injectReducer;

  beforeAll(() => {
    jest.mock('../reducerInjectors', () => ({
      __esModule: true, // this property makes it work
      default: jest.fn().mockImplementation(() => injectors),
    }));
    injectReducer = require('../injectReducer').default;
  });

  beforeEach(() => {
    store = configureStore({}, memoryHistory);
    injectors = {
      injectReducer: jest.fn(),
    };
    ComponentWithReducer = injectReducer({ key: 'test', reducer: reducer })(
      Component,
    );
    jest.unmock('../reducerInjectors');
  });

  it('should inject a given reducer', () => {
    renderer.create(
      // tslint:disable-next-line:jsx-wrap-multiline
      <Provider store={store}>
        <ComponentWithReducer />
      </Provider>,
    );

    expect(injectors.injectReducer).toHaveBeenCalledTimes(1);
    expect(injectors.injectReducer).toHaveBeenCalledWith('test', reducer);
  });

  it('should set a correct display name', () => {
    expect(ComponentWithReducer.displayName).toBe('withReducer(Component)');
    expect(
      injectReducer({ key: 'test', reducer: reducer })(() => null).displayName,
    ).toBe('withReducer(Component)');
  });

  it('should propagate props', () => {
    const props = { testProp: 'test' };
    const renderedComponent = renderer.create(
      // tslint:disable-next-line:jsx-wrap-multiline
      <Provider store={store}>
        <ComponentWithReducer {...props} />
      </Provider>,
    );
    const {
      props: { children },
    } = renderedComponent.getInstance();

    expect(children.props).toEqual(props);
  });
});

describe('useInjectReducer hook', () => {
  let store;
  let injectors;
  let ComponentWithReducer;
  // let injectReducer;

  beforeAll(() => {
    injectors = {
      injectReducer: jest.fn(),
    };
    jest.mock('../reducerInjectors', () => ({
      __esModule: true, // this property makes it work
      default: jest.fn().mockImplementation(() => injectors),
    }));
    // injectReducer = require('../injectReducer').default;

    store = configureStore({}, memoryHistory);
    ComponentWithReducer = () => {
      useInjectReducer({ key: 'test', reducer: reducer });
      return null;
    };
  });

  it('should inject a given reducer', () => {
    render(
      // tslint:disable-next-line:jsx-wrap-multiline
      <Provider store={store}>
        <ComponentWithReducer />
      </Provider>,
    );

    expect(injectors.injectReducer).toHaveBeenCalledTimes(1);
    expect(injectors.injectReducer).toHaveBeenCalledWith('test', reducer);
  });
});
