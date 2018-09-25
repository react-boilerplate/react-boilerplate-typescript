/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 */

enum ActionTypes {
  LOAD_REPOS = 'boilerplate/App/LOAD_REPOS',
  LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS',
  LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR',
}

export default ActionTypes;
