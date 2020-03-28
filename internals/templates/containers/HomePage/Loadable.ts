/**
 * Asynchronously loads the component for HomePage
 */

import loadable from 'app/utils/loadable';

export default loadable(() => import('./index'));
