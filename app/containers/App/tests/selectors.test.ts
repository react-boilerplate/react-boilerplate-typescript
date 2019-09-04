import {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
} from '../selectors';

describe('selectGlobal', () => {
  it('should select the global state', () => {
    const globalState = {} as any;
    const mockedState: any = {
      global: globalState,
    };
    expect(selectGlobal(mockedState)).toEqual(globalState);
  });
});

describe('makeSelectCurrentUser', () => {
  it('should select the current user', () => {
    const currentUserSelector = makeSelectCurrentUser();
    const username = 'mxstbr';
    const mockedState: any = {
      global: {
        currentUser: username,
      },
    };
    expect(currentUserSelector(mockedState)).toEqual(username);
  });
});

describe('makeSelectLoading', () => {
  it('should select the loading', () => {
    const loadingSelector = makeSelectLoading();
    const loading = false;
    const mockedState: any = {
      global: {
        loading,
      },
    };
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectError', () => {
  it('should select the error', () => {
    const errorSelector = makeSelectError();
    const error = 404;
    const mockedState: any = {
      global: {
        error,
      },
    };
    expect(errorSelector(mockedState)).toEqual(error);
  });
});

describe('makeSelectRepos', () => {
  it('should select the repos', () => {
    const reposSelector = makeSelectRepos();
    const repositories = [];
    const mockedState: any = {
      global: {
        userData: {
          repositories,
        },
      },
    };
    expect(reposSelector(mockedState)).toEqual(repositories);
  });
});

describe('makeSelectLocation', () => {
  it('should select the location', () => {
    const locationStateSelector = makeSelectLocation();
    const router = {
      location: { pathname: '/foo' },
    };
    const mockedState: any = {
      router,
    };
    expect(locationStateSelector(mockedState)).toEqual(router.location);
  });
});
