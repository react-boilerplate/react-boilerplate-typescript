import { action } from 'typesafe-actions';
// import { } from './types';

import ActionTypes from './constants';

export const changeUsername = (name: string) => action(ActionTypes.CHANGE_USERNAME, name);
