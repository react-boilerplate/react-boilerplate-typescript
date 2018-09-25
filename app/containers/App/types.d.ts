import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */

interface AppState {
  readonly loading: boolean;
  readonly error: object | boolean;
  readonly currentUser: string;
  readonly userData: UserData;
}

interface UserData {
  readonly repositories: object[] | boolean; // too many fields. Won't declare them all
}


/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;


/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = AppState;
type ContainerActions = AppActions;

export { RootState, ContainerState, ContainerActions };
