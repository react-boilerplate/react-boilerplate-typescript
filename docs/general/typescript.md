## Typescript

**Fully-featured** `react-boilerplate` in Typescript, for typescript lovers like me ;)

Most of the practices in here follows this great guide -> [react-typescript-guide]

**I highly suggest you to get familiar with it.**

### Example Projects

Check in-production examples built with this to see the boilerplate in action and see how to use typescript in a more advanced way

- [Example 1 (in-production)](https://github.com/International-Slackline-Association/Rankings-UI) `(boilerplate version: 3)`
- [Example 2 (in-production)](https://github.com/International-Slackline-Association/Web-Tools) `(boilerplate version: 4)`

### Key Notes

**Styled Components:** To be able to type styled components you must import from `styles/styled-components` instead of `styled-components` directly. Exports are explicitly typed.

**css modules:** CSS modules with typescript require slightly more work than regular CSS. Details are here: https://medium.com/@sapegin/css-modules-with-typescript-and-webpack-6b221ebe5f10. TL;DR version, if you want to use CSS modules, in internals/webpack/webpack.base.babel.js:L47 replace

        use: ['style-loader', 'css-loader'],

with

        use: [
          'style-loader',
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              namedExport: true
            }
          },
        ],

To tell webpack to ignore the generated css.d.ts files, add the following to the plugins section on line 132

        new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),

**Immer:** `Immer` is removed and state is held with normal js objects. Typescript provides compile-time immutability with `readonly` interfaces. Type-safety with `immer` is unnecessarily complicated in this case.

**Type-safety:** Follow [react-typescript-guide] rules and tips for maintaining type safety through out the layers

**Webpack:** `ts-loader` with parallel type checker is used to maximize the typescript transpiling speed (also includes babel typescript plugin).

> Most of the components are not explicitly typed, especially their props are marked as any. The type-safety logic is same across the whole project, so, I only restricted and declared types for HomePage container to set an example. You can apply the same logic to all the components etc...

> Therefore, I suggest you to check the example projects

## Code Examples with Typescript

---

### Declaring Types for your containers/components

Create a type definition file and declare all the types/interfaces that your container will use/manage/export. Like props, slice of reducers, actions

```typescript
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types'; // This is where your define the types your root state of redux

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
type RootState = ApplicationRootState;
type ContainerState = HomeState;
type ContainerActions = AppActions;

// Export only the types this container manages
export { RootState, ContainerState, ContainerActions };
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
  createSelector(
    selectHome,
    substate => {
      // now substate is type-safe
      return substate.username;
    },
  );

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

[react-typescript-guide]: https://github.com/piotrwitek/react-redux-typescript-guide
[discussion]: https://github.com/styled-components/babel-plugin-styled-components/issues/41
[babel plugin]: https://github.com/styled-components/babel-plugin-styled-components
