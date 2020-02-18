import appReducer from '../reducer';
import { loadRepos, reposLoaded, repoLoadingError } from '../actions';
import { ContainerState } from '../types';
import { Repo } from '../../RepoListItem/types';

describe('appReducer', () => {
  let state: ContainerState;
  beforeEach(() => {
    state = {
      loading: false,
      error: false,
      currentUser: '',
      userData: {
        repos: [],
      },
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {} as any)).toEqual(expectedResult);
  });

  it('should handle the loadRepos action correctly', () => {
    const expectedResult = {
      currentUser: '',
      loading: true,
      error: false,
      userData: {
        repos: [],
      },
    };
    expect(appReducer(state, loadRepos())).toEqual(expectedResult);
  });

  it('should handle the reposLoaded action correctly', () => {
    const fixture = [
      {
        name: 'My Repo',
      },
    ] as Repo[];
    const username = 'test';
    const expectedResult = {
      currentUser: username,
      loading: false,
      error: false,
      userData: {
        repos: fixture,
      },
    };
    expect(appReducer(state, reposLoaded(fixture, username))).toEqual(
      expectedResult,
    );
  });

  it('should handle the repoLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };

    const expectedResult = {
      currentUser: '',
      error: fixture,
      loading: false,
      userData: {
        repos: [],
      },
    };

    expect(appReducer(state, repoLoadingError(fixture))).toEqual(
      expectedResult,
    );
  });
});
