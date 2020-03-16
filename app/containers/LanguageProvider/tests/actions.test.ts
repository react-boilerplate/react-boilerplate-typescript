import { action } from 'typesafe-actions';
import { changeLocale } from '../actions';

import ActionTypes from '../constants';

describe('LanguageProvider actions', () => {
  describe('Change Local Action', () => {
    it('has a type of CHANGE_LOCALE', () => {
      const expected = action(ActionTypes.CHANGE_LOCALE, 'de');
      expect(changeLocale('de')).toEqual(expected);
    });
  });
});
