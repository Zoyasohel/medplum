export interface Location {
  pathname: string;
  search: string;
  hash: string;
}

export function getWindowLocation(): Location {
  const loc = window.location;
  return {
    pathname: loc.pathname,
    search: loc.search,
    hash: loc.hash,
  };
}
