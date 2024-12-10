import { ReactNode, useRef } from 'react';
import { InitialEntry, MemoryRouterImpl } from './MemoryRouterImpl';
import { Router } from './Router';
import { RouterProvider } from './RouterProvider';

export interface MemoryRouterProps {
  readonly initialEntries?: InitialEntry[];
  readonly initialIndex?: number;
  readonly children?: ReactNode;
}

export function MemoryRouter(props: MemoryRouterProps): JSX.Element {
  const routerRef = useRef<Router>();

  if (!routerRef.current) {
    routerRef.current = new MemoryRouterImpl(props.initialEntries, props.initialIndex);
  }

  return <RouterProvider router={routerRef.current}>{props.children}</RouterProvider>;
}
