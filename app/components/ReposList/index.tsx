import * as React from 'react';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import RepoListItem from 'containers/RepoListItem';
import { ContainerState, UserData } from '../../containers/App/types';

export type ReposListProps = Pick<ContainerState, 'loading' | 'error'> & Pick<UserData, 'repos'>;

function ReposList({ loading, error, repos }: ReposListProps) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item="Something went wrong, please try again!" />
    );
    return <List component={ErrorComponent} />;
  }
  if (repos !== undefined) {
    return <List items={repos} component={RepoListItem} />;
  }

  return null;
}

export default ReposList;
