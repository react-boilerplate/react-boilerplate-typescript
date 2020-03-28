/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { ApplicationRootState } from 'app/types';
import { initialState } from './reducer';

const selectHome = (state: ApplicationRootState) => state.home || initialState;

const makeSelectUsername = () =>
  createSelector(selectHome, substate => substate.username);

export { selectHome, makeSelectUsername };
