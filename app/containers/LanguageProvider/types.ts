import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

/* --- STATE --- */

interface LanguageProviderState {
  readonly locale: string;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type ContainerState = LanguageProviderState;
type ContainerActions = AppActions;

export { ContainerState, ContainerActions };
