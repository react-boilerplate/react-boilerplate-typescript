/**
 * Test injectors
 */

import checkStore from '../checkStore';
import { InjectedStore } from '../../types';
import { Action, Dispatch } from 'redux';

const action: Action<number> = {
  type: 10,
};
const disp: Dispatch<typeof action> = (param) => param;


describe('checkStore', () => {
  let store: Omit<InjectedStore, 'Symbol[Observable'>;

  beforeEach(() => {
    store = {
      dispatch: disp,
      subscribe: (listener) => () => {},
      getState: () => {},
      replaceReducer: () => {},
      runSaga: () => {},
      injectedReducers: {},
      injectedSagas: {},
    };
  });

  it('should not throw if passed valid store shape', () => {
    expect(() => checkStore(store)).not.toThrow();
  });

  it('should throw if passed invalid store shape', () => {
    expect(() => checkStore({})).toThrow();
    expect(() => checkStore({ ...store, injectedSagas: null })).toThrow();
    expect(() => checkStore({ ...store, injectedReducers: null })).toThrow();
    expect(() => checkStore({ ...store, runSaga: null })).toThrow();
    expect(() => checkStore({ ...store, replaceReducer: null })).toThrow();
  });
});
