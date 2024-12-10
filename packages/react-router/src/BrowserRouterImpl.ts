import { getWindowLocation, Location } from './Location';
import { RouteObject } from './RouteObject';
import { Router } from './Router';

export class BrowserRouterImpl implements Router {
  setLocation?: (newLocation: Location) => void;

  constructor(readonly routes: RouteObject[]) {
    window.addEventListener('popstate', (e) => this.handlePopState(e));
  }

  getInitialLocation(): Location {
    return getWindowLocation();
  }

  handlePopState(_e: PopStateEvent): void {
    this.setLocation?.(getWindowLocation());
  }

  setLocationHandler(setLocation: (newLocation: Location) => void): void {
    this.setLocation = setLocation;
  }

  navigate(to: string): void {
    window.history.pushState({}, '', to);
    this.setLocation?.(getWindowLocation());
  }
}

export function createBrowserRouter(routes: RouteObject[]): BrowserRouterImpl {
  return new BrowserRouterImpl(routes);
}
