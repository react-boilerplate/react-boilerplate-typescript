import homeReducer from '../reducer';
import { changeUsername } from '../actions';
import { ContainerState } from '../types';

describe('homeReducer', () => {
  let state: ContainerState;
  beforeEach(() => {
    state = {
      username: '',
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homeReducer(undefined, {} as any)).toEqual(expectedResult);
  });

  it('should handle the changeUsername action correctly', () => {
    const fixture = 'mxstbr';
    const expectedResult = { username: fixture };

    expect(homeReducer(state, changeUsername(fixture))).toEqual(expectedResult);
  });
});
