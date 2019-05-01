/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from './selectors';

export interface ILanguageProviderProps {
  locale?: string;
  messages: { [locale: string]: { [id: string]: string } };
  children?: React.ReactNode;
}

export function LanguageProvider(props: ILanguageProviderProps) {
  return (
    <IntlProvider
      locale={props.locale}
      key={props.locale}
      messages={props.messages[props.locale || '']}
    >
      {React.Children.only(props.children)}
    </IntlProvider>
  );
}
const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
  locale: locale,
}));

export default connect(mapStateToProps)(LanguageProvider);
