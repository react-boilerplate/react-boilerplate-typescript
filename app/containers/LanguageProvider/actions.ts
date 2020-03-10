/*
 *
 * LanguageProvider actions
 *
 */

import { action } from 'typesafe-actions';
import ActionTypes from './constants';

export const changeLocale = (languageLocale: string) =>
  action(ActionTypes.CHANGE_LOCALE, languageLocale);
