export interface ParamSegment {
  type: 'param';
  name: string;
}

export interface LiteralSegment {
  type: 'literal';
  value: string;
}

export type PathSegment = ParamSegment | LiteralSegment;

export interface RouteMatch {
  matchedPath: LiteralSegment[];
  remainingPath: LiteralSegment[];
  params: Record<string, string>;
}

/**
 * Splits a path into segments and identifies parameter names
 * @param path - Path string to parse
 * @returns Array of segments, each either a literal string or param object
 */
export function parsePath(path: string): PathSegment[] {
  return path
    .split('/')
    .filter(Boolean)
    .map((segment) => {
      if (segment.startsWith(':')) {
        return { type: 'param', name: segment.slice(1) };
      }
      return { type: 'literal', value: segment };
    });
}

export function parseLiteralPath(path: string): LiteralSegment[] {
  return path
    .split('/')
    .filter(Boolean)
    .map((segment) => ({ type: 'literal', value: segment }));
}

/**
 * Determines if the path string matches the location object.
 * On match, returns the "params" from the route path.
 * @param location - The location to test.
 * @param pattern - The path string to test.
 * @param parentMatch - Optiaonl parent match if in a nested route.
 * @returns Path params on match; false otherwise.
 */
export function matchesRoute(
  location: LiteralSegment[],
  pattern: PathSegment[],
  parentMatch?: RouteMatch
): RouteMatch | false {
  // If we have a parent match, we match against remainingPath
  const pathToMatch = parentMatch ? parentMatch.remainingPath : location;

  // For index routes, we match exactly against parent's matched path
  if (pattern.length === 0) {
    if (pathToMatch.length === 0) {
      return {
        matchedPath: [],
        remainingPath: [],
        params: parentMatch?.params ?? {},
      };
    } else {
      return false;
    }
  }

  // If path is longer than location, it can't be a match
  if (pattern.length > pathToMatch.length) {
    return false;
  }

  const params: Record<string, string> = {};

  // Compare segments, but only up to path length
  for (let i = 0; i < pattern.length; i++) {
    const pathSeg = pattern[i];
    const locationSeg = pathToMatch[i];

    if (pathSeg.type === 'param') {
      // For params, store the value
      params[pathSeg.name] = locationSeg.value;
    } else if (pathSeg.value !== locationSeg.value) {
      // For literals, they must match exactly
      return false;
    }
  }

  return {
    matchedPath: pathToMatch.slice(0, pattern.length),
    remainingPath: pathToMatch.slice(pattern.length),
    params,
  };
}
