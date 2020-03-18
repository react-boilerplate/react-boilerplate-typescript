import { selectLanguage } from '../selectors';
import { initialState } from '../reducer';

describe('selectLanguage', () => {
  it('should select the language state', () => {
    const languageState = {};
    const mockedState: any = {
      language: languageState,
    };
    expect(selectLanguage(mockedState)).toEqual(languageState);
  });

  it('should select the initial state when state is missing', () => {
    const mockedState: any = {};
    expect(selectLanguage(mockedState)).toEqual(initialState);
  });
});
