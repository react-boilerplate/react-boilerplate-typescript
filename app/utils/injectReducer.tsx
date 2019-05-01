import * as React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ReactReduxContext } from 'react-redux';

import getInjectors from './reducerInjectors';
import { InjectReducerParams, LifeStore } from 'types';

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */

export default function hocWithReducer<P>({
  key,
  reducer,
}: InjectReducerParams) {
  function wrap(
    WrappedComponent: React.ComponentType<P>,
  ): React.ComponentType<P> {
    // dont wanna give access to HOC. Child only
    class ReducerInjector extends React.Component<P> {
      public static WrappedComponent = WrappedComponent;
      public static displayName = `withReducer(${WrappedComponent.displayName ||
        WrappedComponent.name ||
        'Component'})`;

      constructor(props: any, context: any) {
        super(props, context);

        getInjectors(context.store).injectReducer(key, reducer);
      }

      public render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return hoistNonReactStatics(ReducerInjector, WrappedComponent) as any;
  }
  return wrap;
}

const useInjectReducer = ({ key, reducer }: InjectReducerParams) => {
  const context = React.useContext(ReactReduxContext);
  React.useEffect(() => {
    getInjectors(context.store as LifeStore).injectReducer(key, reducer);
  }, []);
};

export { useInjectReducer };
