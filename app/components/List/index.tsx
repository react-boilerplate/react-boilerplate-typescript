import * as React from 'react';

import Ul from './Ul';
import Wrapper from './Wrapper';
import { Repo } from '../../containers/RepoListItem/types';
import { UserData } from '../../containers/App/types';

interface Props {
  component: React.ComponentType<any>;
  items?: UserData['repos'];
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

const items: UserData['repos'] = [];
export default List;
