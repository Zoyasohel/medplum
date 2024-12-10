import { createContext, useContext } from 'react';
import { Location } from './Location';
import { Router } from './Router';

export const reactRouterContext = createContext(undefined as RouterContext | undefined);

export interface RouterContext {
  readonly router: Router;
  readonly location: Location;
}

export type NavigateFunction = (to: string) => void;

export function useLocation(): Location {
  const context = useContext(reactRouterContext);
  if (!context) {
    throw new Error('useLocation hook requires a router context');
  }
  return context.location;
}

export function useNavigate(): NavigateFunction {
  const context = useContext(reactRouterContext);
  if (!context) {
    throw new Error('useNavigate hook requires a router context');
  }
  return (to: string) => context.router.navigate(to);
}
