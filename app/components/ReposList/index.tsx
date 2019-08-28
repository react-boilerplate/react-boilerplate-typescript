import * as React from 'react';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import RepoListItem from 'containers/RepoListItem';

function ReposList({
  loading,
  error,
  repos,
}: {
  loading?: boolean;
  error?: any;
  repos?: any;
}) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item="Something went wrong, please try again!" />
    );
    return <List component={ErrorComponent} />;
  }
  if (repos !== false) {
    return <List items={repos} component={RepoListItem} />;
  }

  return null;
}

export default ReposList;
