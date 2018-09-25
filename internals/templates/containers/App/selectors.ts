import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';

const selectRoute = (state: ApplicationRootState) => state.route;

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.location);

export { makeSelectLocation };
