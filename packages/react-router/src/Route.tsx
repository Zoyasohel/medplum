import { Children, isValidElement, ReactNode } from 'react';
import { OutletContext } from './Outlet.context';

export interface BaseRouteProps {
  readonly element: JSX.Element;
  readonly children?: ReactNode;
}

export interface IndexRouteProps extends BaseRouteProps {
  readonly index: true;
}

export interface PathRouteProps extends BaseRouteProps {
  readonly path: string;
}

export type RouteProps = IndexRouteProps | PathRouteProps;

export function Route(props: RouteProps): JSX.Element | null {
  const { element, children } = props;

  const hasNestedRoutes = Children.toArray(children).some((child) => isValidElement(child) && child.type === Route);

  if (hasNestedRoutes) {
    return <OutletContext.Provider value={{ nestedRoutes: children }}>{element}</OutletContext.Provider>;
  }

  return element;
}
