/*
 *
 * LanguageToggle
 *
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Toggle from 'components/Toggle';
import Wrapper from './Wrapper';
import messages from './messages';
import { appLocales } from 'i18n';
import { changeLocale } from '../LanguageProvider/actions';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import { Dispatch } from 'redux';

// tslint:disable-next-line:no-empty-interface
interface OwnProps {}

// tslint:disable-next-line:no-empty-interface
interface StateProps {
  locale: string;
}

interface DispatchProps {
  onLocaleToggle(evt: any): void;
  dispatch: Dispatch;
}
type Props = StateProps & DispatchProps & OwnProps;

export function LocaleToggle(props: Props) {
  return (
    <Wrapper>
      <Toggle
        value={props.locale}
        values={appLocales}
        messages={messages}
        onToggle={props.onLocaleToggle}
      />
    </Wrapper>
  );
}

const mapStateToProps = createSelector(
  makeSelectLocale(),
  locale => ({
    locale: locale,
  }),
);

export function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onLocaleToggle: evt => dispatch(changeLocale(evt.target.value)),
    dispatch: dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaleToggle);
