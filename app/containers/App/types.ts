import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { Repo } from '../RepoListItem/types';

/* --- STATE --- */

interface AppState {
  readonly loading: boolean;
  readonly error?: object | boolean;
  readonly currentUser: string;
  readonly userData: UserData;
}

interface UserData {
  readonly repos?: Repo[];
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type ContainerState = AppState;
type ContainerActions = AppActions;

export { ContainerState, ContainerActions, UserData };
