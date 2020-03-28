/**
 * Asynchronously loads the component for FeaturePage
 */
import * as React from 'react';
import loadable from 'app/utils/loadable';
import LoadingIndicator from 'app/components/LoadingIndicator';

export default loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});
