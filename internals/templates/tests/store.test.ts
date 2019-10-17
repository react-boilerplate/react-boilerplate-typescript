/**
 * Test store addons
 */

// import { BrowserRouter } from 'react-router-dom';
import configureStore from '../configureStore';
import history from '../utils/history';
import { InjectedStore } from '../../../app/types';

describe('configureStore', () => {
  let store: InjectedStore;

  beforeAll(() => {
    store = configureStore({}, history);
  });

  describe('injectedReducers', () => {
    it('should contain an object for reducers', () => {
      expect(typeof store.injectedReducers).toBe('object');
    });
  });

  describe('injectedSagas', () => {
    it('should contain an object for sagas', () => {
      expect(typeof store.injectedSagas).toBe('object');
    });
  });

  describe('runSaga', () => {
    it('should contain a hook for `sagaMiddleware.run`', () => {
      expect(typeof store.runSaga).toBe('function');
    });
  });
});

describe('configureStore params', () => {
  it('should call window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', () => {
    const compose = jest.fn();
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = () => compose;
    configureStore(undefined, history);
    expect(compose).toHaveBeenCalled();
  });
});
