import { ReactNode, useRef } from 'react';
import { BrowserRouterImpl } from './BrowserRouterImpl';
import { Router } from './Router';
import { RouterProvider } from './RouterProvider';

export interface BrowserRouterProps {
  readonly children?: ReactNode;
}

export function BrowserRouter(props: BrowserRouterProps): JSX.Element {
  const routerRef = useRef<Router>();

  if (!routerRef.current) {
    routerRef.current = new BrowserRouterImpl([]);
  }

  return <RouterProvider router={routerRef.current}>{props.children}</RouterProvider>;
}
