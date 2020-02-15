import { selectLanguage } from '../selectors';

describe('selectLanguage', () => {
  it('should select the global state', () => {
    const globalState = {};
    const mockedState: any = {
      language: globalState,
    };
    expect(selectLanguage(mockedState)).toEqual(globalState);
  });
});
