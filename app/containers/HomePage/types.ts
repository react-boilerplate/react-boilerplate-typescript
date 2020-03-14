import { ActionType } from 'typesafe-actions';
import { ApplicationRootState } from 'types';
import * as actions from './actions';

/* --- STATE --- */

interface HomeState {
  readonly username: string;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = HomeState;
type ContainerActions = AppActions;

export { RootState, ContainerState, ContainerActions };
