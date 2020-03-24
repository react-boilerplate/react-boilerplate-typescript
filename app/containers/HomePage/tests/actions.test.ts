import { action } from 'typesafe-actions';
import ActionTypes from '../constants';

import { changeUsername } from '../actions';

describe('Home Actions', () => {
  describe('changeUsername', () => {
    it('should return the correct type and the passed name', () => {
      const fixture = 'Max';
      const expectedResult = action(ActionTypes.CHANGE_USERNAME, fixture);

      expect(changeUsername(fixture)).toEqual(expectedResult);
    });
  });
});
