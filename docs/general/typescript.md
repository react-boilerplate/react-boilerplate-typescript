## Typescript

Boilerplate in Typescript with `strict:true` flag on, for typescript lovers like me ;)

Based on the works of [react-typescript-guide] and <a href="https://github.com/StrikeForceZero/react-typescript-boilerplate"> typescript fork </a>(which was for previous versions)

Check the [web application](https://github.com/International-Slackline-Association/Rankings-UI) to see the boilerplate in action and see how to use the typescript in this boilerplate in a more advanced way. 

### Key Notes

**Styled Components:** To be able to type styled components you must import from `styles/styled-components` instead of `styled-components` directly. Exports are explicitly typed.

**css modules:** CSS modules with typescript require slightly more work than regular CSS.  Details are here: https://medium.com/@sapegin/css-modules-with-typescript-and-webpack-6b221ebe5f10.  TL;DR version, if you want to use CSS modules, in internals/webpack/webpack.base.babel.js:L47 replace 

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

**Immutable.js:** Immutable data structers are removed and state is held with normal js objects. Typescript provides compile-time immutability with `readonly` interfaces. Type-safety with `immutable.js` is unnecessarily complicated in this case.

**Saga/Reducer Injectors:** Only the containers props are exported explicity and for simplicity even though it was enhanced with injector components. I see no use in accessing their props.

**Type-safety:** Follow [react-typescript-guide] rules and tips for maintaining type safety through out the layers

**Webpack:** awesome-typescript-loader is used with babel. However, styled-components transformer is used with plug-in instead of [babel plugin] due to the [discussion]

> Most of the components are not explicitly typed, especially their props are marked as any. The type-safety logic is same across the whole project, so, I only restricted and declared types for HomePage container to set an example. You can apply the same logic to all the components etc...

> All the test files are removed. Testing with jest is for now to-do
### Todo

- Test configuration / test files generation
- Setting `noImplicitAny` to `false`
- Improve typings of sagas

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

`combineReducers` now can manage different slices in a type-safe way. Note that with typescript immutable.js is removed so we don't need `redux-immutable` here.

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
interface OwnProps {
  a_internal_prop: string;
}

// Props that will be injected to this components from redux state
interface StateProps {
  username: string;
}

// Props that will be injected to this components from redux actions
interface DispatchProps {
    onSomeEvent();
}


// Component can access all of the injected props
type Props = StateProps & DispatchProps & OwnProps;
export class HomePage extends React.PureComponent<Props> {
    ///
}
```


Type-safe injectors

```typescript

// Map Disptach to your DispatchProps
export function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => dispatch(loadRepos()),
  };
}

// Map RootState to your StateProps
const mapStateToProps = createStructuredSelector<RootState, StateProps>({
  // All the keys and values are type-safe
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// Explicitly restrict props to this components props after injection. There is no use accessing reducer injector props. 
const withReducer = injectReducer<OwnProps>({ key: 'home', reducer: reducer });
// Explicitly restrict props to this components props after injection. There is no use accessing saga injector props. 
const withSaga = injectSaga<OwnProps>({ key: 'home', saga: saga });

// export default withReducer(withSaga(withConnect(HomePage))); // identical to compose function, but requires no type declaration
export default compose<TReducer, TSaga, TConnect, ReturnType>(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);

// compose doesn't infer types. As mentioned, composed component will only export OwnProps to outside, so mark them as ReturnType here.
type ReturnType = React.ComponentType<OwnProps>;
type TReducer = ReturnType;
type TSaga = ReturnType;
type TConnect = typeof HomePage;


```

[react-typescript-guide]: https://github.com/piotrwitek/react-redux-typescript-guide
[discussion]: https://github.com/styled-components/babel-plugin-styled-components/issues/41
[babel plugin]: https://github.com/styled-components/babel-plugin-styled-components
