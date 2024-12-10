import { useContext } from 'react';
import { OutletContext } from './Outlet.context';
import { Routes } from './Routes';

export function Outlet(): JSX.Element | null {
  const outletContext = useContext(OutletContext);

  if (!outletContext?.nestedRoutes) {
    return null;
  }

  return <Routes>{outletContext.nestedRoutes}</Routes>;
}
