import { Location } from './Location';

export interface Router {
  getInitialLocation(): Location;

  setLocationHandler(setLocation: (newLocation: Location) => void): void;

  navigate(to: string): void;
}
