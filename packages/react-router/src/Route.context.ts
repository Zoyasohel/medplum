import { createContext, useContext } from 'react';
import { RouteMatch } from './match';

export const RouteContext = createContext<{
  match: RouteMatch;
} | null>(null);

export function useParams(): Record<string, string> {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('useParams must be used within a Route');
  }
  return context.match.params;
}
