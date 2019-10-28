import * as React from 'react';

import Ul from './Ul';
import Wrapper from './Wrapper';
import { Repo } from '../../containers/RepoListItem/types';

interface Props {
  component: React.ComponentType<any>;
  items?: Repo[];
}

function List(props: Props) {
  const ComponentToRender = props.component;
  let content = <div /> as JSX.Element | JSX.Element[];

  // If we have items, render them
  if (props.items) {
    content = props.items.map(item => (
      <ComponentToRender key={`item-${item.id}`} item={item} />
    ));
  } else {
    // Otherwise render a single component
    content = <ComponentToRender />;
  }

  return (
    <Wrapper>
      <Ul>{content}</Ul>
    </Wrapper>
  );
}

export default List;
