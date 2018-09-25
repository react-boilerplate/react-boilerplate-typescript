## Typescript 

Boilerplate in Typescript with `strict:true` flag on, for typescript lovers like me ;)

Based on works of [react-typescript-guide] and <a href="https://github.com/StrikeForceZero/react-typescript-boilerplate"> typescript fork </a>(which was for previous versions)

### Key Notes

**Styled Components:** To be able to type styled components you must import from `styles/styled-components` instead of `styled-components` directly. Exports are explicitly typed. 

**Immutable.js:** Immutable data structers are removed and state is held with normal js objects. Typescript provides compile-time immutability with `readonly` interfaces. Type-safety with `immutable.js` is unnecessarily complicated in this case.

**Saga/Reducer Injectors:** Only the containers props are exported explicity and for simplicity even though it was enhanced with injector components. I see no use in accessing their props.

**Type-safety:** Follow [react-typescript-guide] rules and tips for maintaining type safety through out the layers


> Most of the components are not explicitly typed, especially their props are marked as any. The type-safety logic is same across the whole project, so, I only restricted and declared types for HomePage container to set an example. You can apply the same logic to all the components etc... 

Feedback is extremely welcome (I created a typescript version for the project I was doing. It was switched on the fly, so it is probably missing lot of things)

### Todo
- Test configuration / test files generation
- Setting `noImplicitAny` to `false`
- Improve typings of sagas

[react-typescript-guide]: <https://github.com/piotrwitek/react-redux-typescript-guide>