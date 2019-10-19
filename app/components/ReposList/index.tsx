import * as React from 'react';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import RepoListItem from 'containers/RepoListItem';
import { ContainerState, UserData } from '../../containers/App/types';

interface Props {
  loading?: ContainerState['loading'];
  error?: ContainerState['error'];
  repos?: UserData['repos'];
}

function ReposList({ loading, error, repos }: Props) {
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
