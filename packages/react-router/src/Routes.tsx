import { Children, isValidElement, ReactElement, ReactNode, useContext, useMemo } from 'react';
import { IndexRouteProps, PathRouteProps, Route, RouteProps } from './Route';
import { RouteContext } from './Route.context';
import { useLocation } from './RouterProvider.context';
import { matchesRoute, parseLiteralPath, parsePath, PathSegment } from './match';

export interface RoutesProps {
  readonly children?: ReactNode;
}

export function Routes(props: RoutesProps): JSX.Element | null {
  const location = useLocation();
  const parentContext = useContext(RouteContext);

  const { matchingRoute, match } = useMemo(() => {
    // Convert children to array and flatten
    const routes = Children.toArray(props.children).filter(
      (child) => isValidElement(child) && child.type === Route
    ) as ReactElement<RouteProps>[];

    const locationSegments = parseLiteralPath(location.pathname);

    // Find the first matching route and its params
    for (const route of routes) {
      let pathSegments: PathSegment[];

      if ((route.props as IndexRouteProps).index) {
        pathSegments = [];
      } else {
        pathSegments = parsePath((route.props as PathRouteProps).path);
      }

      const match = matchesRoute(locationSegments, pathSegments, parentContext?.match);
      if (match) {
        return { matchingRoute: route, match };
      }
    }

    return { matchingRoute: null, match: null };
  }, [props.children, location, parentContext]);

  if (!matchingRoute) {
    return null;
  }

  return <RouteContext.Provider value={{ match }}>{matchingRoute}</RouteContext.Provider>;
}
