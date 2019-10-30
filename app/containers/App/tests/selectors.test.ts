import {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
} from '../selectors';
import { ApplicationRootState } from '../../../types';
import { Repo } from '../../RepoListItem/types';

describe('selectGlobal', () => {
  it('should select the global state', () => {
    const globalState = {};
    // tslint:disable-next-line:no-object-literal-type-assertion
    const mockedState = {
      global: globalState,
    } as ApplicationRootState;
    expect(selectGlobal(mockedState)).toEqual(globalState);
  });
});

describe('makeSelectCurrentUser', () => {
  it('should select the current user', () => {
    const currentUserSelector = makeSelectCurrentUser();
    const username = 'mxstbr';
    // tslint:disable-next-line:no-object-literal-type-assertion
    const mockedState = {
      global: {
        currentUser: username,
      },
    } as ApplicationRootState;
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
    const repos: Repo[] = [];
    // tslint:disable-next-line:no-object-literal-type-assertion
    const mockedState = {
      global: {
        userData: {
          repos: repos,
        },
      },
    } as ApplicationRootState;
    expect(reposSelector(mockedState)).toEqual(repos);
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
