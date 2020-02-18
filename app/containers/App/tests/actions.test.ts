import ActionTypes from '../constants';

import { loadRepos, reposLoaded, repoLoadingError } from '../actions';
import { action } from 'typesafe-actions';
import { Repo } from '../../RepoListItem/types';

describe('App Actions', () => {
  describe('loadRepos', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: ActionTypes.LOAD_REPOS,
      };

      expect(loadRepos()).toEqual(expectedResult);
    });
  });

  describe('reposLoaded', () => {
    it('should return the correct type and the passed repos', () => {
      const fixture = [{}] as Repo[];
      const username = 'test';
      const expectedResult = action(
        ActionTypes.LOAD_REPOS_SUCCESS,
        { repos: fixture, username },
      );

      expect(reposLoaded(fixture, username)).toEqual(expectedResult);
    });
  });

  describe('repoLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = action(
        ActionTypes.LOAD_REPOS_ERROR,
        fixture,
      );

      expect(repoLoadingError(fixture)).toEqual(expectedResult);
    });
  });
});
