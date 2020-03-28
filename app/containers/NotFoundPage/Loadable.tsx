/**
 * Asynchronously loads the component for HomePage
 */

import React from 'react';
import loadable from 'app/utils/loadable';
import LoadingIndicator from 'app/components/LoadingIndicator';

export default loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});
