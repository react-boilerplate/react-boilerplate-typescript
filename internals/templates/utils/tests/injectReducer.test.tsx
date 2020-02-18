/**
 * Test injectors
 */

import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import configureStore from '../../configureStore';
import { getInjectors } from '../reducerInjectors';

import { createMemoryHistory } from 'history';

const memoryHistory = createMemoryHistory();
jest.mock('../reducerInjectors');

import { useInjectReducer } from '../injectReducer';

// Fixtures
const Component = () => null;

const reducer = s => s;


describe('injectReducer decorator', () => {
  let store;
  let ComponentWithReducer;
  let injectReducer;
  let injectors;

  beforeAll(() => {
    const mockedGetInjectors = (getInjectors as unknown) as jest.Mock<
      typeof getInjectors
    >; // compiler doesn't know that it's mocked. So manually cast it.
    mockedGetInjectors.mockImplementation(() => injectors);
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
    )
      .getInstance();
    if (!renderedComponent) {
      throw new Error();
    }

    const {
      props: { children },
    } = renderedComponent;

    expect(children.props).toEqual(props);
  });
});

describe('useInjectReducer hook', () => {
  let store;
  let injectors;
  let ComponentWithReducer;

  beforeAll(() => {
    injectors = {
      injectReducer: jest.fn(),
    };
    const mockedGetInjectors = (getInjectors as unknown) as jest.Mock<
      typeof getInjectors
    >; // compiler doesn't know that it's mocked. So manually cast it.
    mockedGetInjectors.mockImplementation(() => injectors);

    store = configureStore({}, memoryHistory);
    ComponentWithReducer = () => {
      useInjectReducer({ key: 'test', reducer: reducer });
      return null;
    };
  });

  it('should inject a given reducer', () => {
    render(
      // tslint:disable-next-line: jsx-wrap-multiline
      <Provider store={store}>
        <ComponentWithReducer />
      </Provider>,
    );

    expect(injectors.injectReducer).toHaveBeenCalledTimes(1);
    expect(injectors.injectReducer).toHaveBeenCalledWith('test', reducer);
  });
});
