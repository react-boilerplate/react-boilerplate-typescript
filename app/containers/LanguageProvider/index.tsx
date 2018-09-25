/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import * as React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from './selectors';

export interface ILanguageProviderProps {
  locale?: string;
  messages: { [locale: string]: { [id: string]: string } };
  children?: React.ReactNode;
}

export class LanguageProvider extends React.PureComponent<ILanguageProviderProps, {}> {
  public render() {
    return (
      <IntlProvider
        locale={this.props.locale}
        key={this.props.locale}
        messages={this.props.messages[this.props.locale as string]}
      >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    );
  }
}

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
  locale: locale,
}));

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LanguageProvider);
