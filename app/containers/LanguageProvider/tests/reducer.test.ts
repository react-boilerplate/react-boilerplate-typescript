import languageProviderReducer from '../reducer';
import ActionTypes from '../constants';

describe('languageProviderReducer', () => {
  it('returns the initial state', () => {
    expect(languageProviderReducer(undefined, {} as any)).toEqual({
      locale: 'en',
    });
  });

  it('changes the locale', () => {
    expect(
      languageProviderReducer(undefined, {
        type: ActionTypes.CHANGE_LOCALE,
        payload: 'de',
      }),
    ).toEqual({
      locale: 'de',
    });
  });
});
