import { createContext, ReactNode } from 'react';

export interface OutletContextValue {
  readonly nestedRoutes: ReactNode;
}

export const OutletContext = createContext<OutletContextValue | null>(null);
