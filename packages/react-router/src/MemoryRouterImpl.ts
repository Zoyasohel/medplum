import { Location } from './Location';
import { Router } from './Router';

export type InitialEntry = string | Partial<Location>;

export class MemoryRouterImpl implements Router {
  history: Location[];
  historyIndex: number;
  setLocation?: (newLocation: Location) => void;

  constructor(initialEntries: InitialEntry[] | undefined, initialIndex = 0) {
    this.history = initialEntries?.map(initialEntryToLocation) ?? [];
    this.historyIndex = initialIndex;
  }

  getInitialLocation(): Location {
    return this.history[this.historyIndex];
  }

  setLocationHandler(setLocation: (newLocation: Location) => void): void {
    this.setLocation = setLocation;
  }

  navigate(to: string): void {
    // Delete all history after current location
    this.history.splice(this.historyIndex);

    // Add the new location
    const newLoc = initialEntryToLocation(to);
    this.history.push(newLoc);

    // History index is now the last entry
    this.historyIndex = this.history.length - 1;

    // Update any listeners
    this.setLocation?.(newLoc);
  }
}

function initialEntryToLocation(initialEntry: InitialEntry): Location {
  if (typeof initialEntry === 'string') {
    return {
      pathname: initialEntry,
      search: '',
      hash: '',
    };
  }
  return {
    pathname: initialEntry.pathname ?? '/',
    search: initialEntry.search ?? '',
    hash: initialEntry.hash ?? '',
  };
}
