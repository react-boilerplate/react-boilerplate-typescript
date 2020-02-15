import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';

const selectRoute = (state: ApplicationRootState) => state.router;

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.location);

export { makeSelectLocation };
