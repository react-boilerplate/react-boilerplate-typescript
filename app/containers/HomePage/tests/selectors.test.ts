import { selectHome, makeSelectUsername } from '../selectors';

describe('selectHome', () => {
  it('should select the home state', () => {
    const homeState = {
      userData: {},
    };
    const mockedState: any = {
      home: homeState,
    };
    expect(selectHome(mockedState)).toEqual(homeState);
  });
});

describe('makeSelectUsername', () => {
  const usernameSelector = makeSelectUsername();
  it('should select the username', () => {
    const username = 'mxstbr';
    const mockedState: any = {
      home: {
        username,
      },
    };
    expect(usernameSelector(mockedState)).toEqual(username);
  });
});
