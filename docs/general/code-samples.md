# Code Examples with Typescript

### Declaring Types for your containers/components

Create a type definition file and declare all the types/interfaces that your container will use/manage/export. Like props, slice of reducers, actions

```typescript
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

/* --- STATE --- */
// Container is only responsible for managing this state
interface HomeState {
  readonly username: string;
}

/* --- ACTIONS --- */
// Actions that can be fired within these container
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */
// Standardize your export names so that in other files you can refer them with standardized names
type ContainerState = HomeState;
type ContainerActions = AppActions;

// Export only the types this container manages
export { ContainerState, ContainerActions };
```

---

## Constants

Take advantages of `enums` while defining constants

```typescript
enum ActionTypes {
  CHANGE_USERNAME = 'boilerplate/Home/CHANGE_USERNAME',
}
export default ActionTypes;
```

---

## Actions

Use `typesafe-actions` for keeping type-safety when accessing actions

```typescript
import { action } from 'typesafe-actions';

import ActionTypes from './constants';

// payload will be inferred as string at reducers
export const changeUsername = (name: string) =>
  action(ActionTypes.CHANGE_USERNAME, name);
```

---

## Selectors

`selectors` will take root state and return appropriate slices of that state

```typescript
import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { ApplicationRootState } from 'types';

// state is your applications root state.
const selectHome = (state: ApplicationRootState) => {
  return state.home ? state.home : initialState;
};

const makeSelectUsername = () =>
  createSelector(selectHome, substate => {
    // now substate is type-safe
    return substate.username;
  });

export { selectHome, makeSelectUsername };
```

---

## Reducers

Manage the slice of your root state in a type-safe way

```typescript
import ActionTypes from './constants';
// Import types that you ONLY need for managing this slice of state,
import { ContainerState, ContainerActions } from './types';

// This container is only managing slice of root state, which has username only in it
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
        // action.payload is inferred as string and is now type-safe
        username: action.payload.replace(/@/gi, ''),
      };
    default:
      return state;
  }
}

export default homeReducer;
```

`combineReducers` now can manage different slices in a type-safe way.

```typescript
import { combineReducers } from 'redux';

// Now slices of your state is combined to a reducer. All the types are preserved.
export default combineReducers<ContainerState, ContainerActions>({
  // keys here are type-safe
  username: (state = initialState.username, action) => {
    return state;
  },
});
```

---

### React Components

Declare types of all the props of this component

```typescript
interface Props {
  a_internal_prop: string;
}

export function HomePage(props: Props) {
  // ...
}
```

Type-safe hooks are extremely straight forward and easy

```typescript
export function HomePage(props: Props) {
  const [someValue, setSomeValue] = useState<boolean>(true);
  // ...
}
```
