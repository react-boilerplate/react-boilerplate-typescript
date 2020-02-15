import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguage = (state: ApplicationRootState) => state.language || initialState;

/**
 * Select the language locale
 */

const makeSelectLocale = () => createSelector(selectLanguage, languageState => languageState.locale);

export { selectLanguage, makeSelectLocale };
