import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

// The initial state of the App
export const initialState: ContainerState = {
  username: '',
};


// Take this container's state (as a slice of root state), this container's actions and return new state
function homeReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.CHANGE_USERNAME:
      return {
        // Delete prefixed '@' from the github username
        username: action.payload.replace(/@/gi, ''),
      };
    default:
      return state;
  }
}

export default homeReducer;
