import {
  BrowserRouter,
  createBrowserRouter,
  Link,
  MemoryRouter,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from '.';

describe('Index', () => {
  test('Exports', () => {
    expect(BrowserRouter).toBeDefined();
    expect(Link).toBeDefined();
    expect(MemoryRouter).toBeDefined();
    // expect(NavLink).toBeDefined();
    // expect(Navigate).toBeDefined();
    expect(Outlet).toBeDefined();
    expect(Route).toBeDefined();
    expect(RouterProvider).toBeDefined();
    expect(Routes).toBeDefined();
    expect(createBrowserRouter).toBeDefined();
    expect(useLocation).toBeDefined();
    expect(useNavigate).toBeDefined();
    expect(useParams).toBeDefined();
    // expect(useSearchParams).toBeDefined();
  });
});
