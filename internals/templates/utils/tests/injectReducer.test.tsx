import * as React from 'react';

/**
 * Test injectors
 */

import { createMemoryHistory } from 'history';
import { shallow } from 'enzyme';
import { identity } from 'lodash';

import configureStore from '../../configureStore';

// Fixtures
const Component = () => null;

const reducer = identity;

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
    ComponentWithReducer = injectReducer({ key: 'test', reducer: reducer })(Component);
    jest.unmock('../reducerInjectors');
  });

  it('should inject a given reducer', () => {
    shallow(<ComponentWithReducer />, { context: { store: store } });

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
    const renderedComponent = shallow(<ComponentWithReducer {...props} />, {
      context: { store: store },
    });

    expect(renderedComponent.prop('testProp')).toBe('test');
  });
});
