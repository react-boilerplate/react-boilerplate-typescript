/**
 *
 * LocaleToggle
 *
 */

import * as React from 'react';

import Select from './Select';
import ToggleOption from '../ToggleOption';

function Toggle(props) {
  let content = <option>--</option>;

  // If we have items, render them
  if (props.values) {
    content = props.values.map(value => (
      <ToggleOption key={value} value={value} message={props.messages[value]} />
    ));
  }

  return (
    <Select value={props.value} onChange={props.onToggle}>
      {content}
    </Select>
  );
}

export default Toggle;
