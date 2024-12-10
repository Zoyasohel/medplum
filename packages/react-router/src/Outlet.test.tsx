import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from './MemoryRouter';
import { Route } from './Route';
import { Routes } from './Routes';
import { Link } from './Link';
import { Outlet } from './Outlet';

function setup(url = '/'): void {
  render(
    <MemoryRouter initialEntries={[url]} initialIndex={0}>
      <Routes>
        <Route
          path="/posts/:id"
          element={
            <>
              <div>1</div>
              <Outlet />
              <div>2</div>
            </>
          }
        >
          <Route index element={<div>index</div>} />
          <Route path="x" element={<div>x</div>} />
          <Route path="y" element={<div>y</div>} />
        </Route>
      </Routes>
      <Link to="/posts/123/x">Go</Link>
    </MemoryRouter>
  );
}

describe('Outlet', () => {
  test('Simple', async () => {
    setup('/posts/123');
    expect(screen.getByText('index')).toBeInTheDocument();
    expect(screen.queryByText('x')).toBeNull();
    expect(screen.queryByText('y')).toBeNull();
  });

  test('Navigate', async () => {
    setup('/posts/123');
    expect(screen.getByText('index')).toBeInTheDocument();
    expect(screen.queryByText('x')).toBeNull();
    expect(screen.queryByText('y')).toBeNull();

    fireEvent.click(screen.getByText('Go'));

    expect(screen.queryByText('index')).toBeNull();
    expect(screen.getByText('x')).toBeInTheDocument();
    expect(screen.queryByText('y')).toBeNull();
  });
});
