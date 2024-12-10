import { ReactNode, useMemo, useState } from 'react';
import { Location } from './Location';
import { Router } from './Router';
import { reactRouterContext } from './RouterProvider.context';

export interface RouterProviderProps {
  readonly router: Router;
  readonly children?: ReactNode;
}

export function RouterProvider(props: RouterProviderProps): JSX.Element {
  const router = props.router;

  const [location, setLocation] = useState<Location>(router.getInitialLocation());

  router.setLocationHandler(setLocation);

  const ctxValue = useMemo(() => ({ router, location }), [router, location]);

  return <reactRouterContext.Provider value={ctxValue}>{props.children}</reactRouterContext.Provider>;
}
