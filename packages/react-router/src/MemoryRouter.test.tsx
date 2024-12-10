import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from './MemoryRouter';
import { Route } from './Route';
import { Routes } from './Routes';
import { Link } from './Link';

function setup(url = '/'): void {
  render(
    <MemoryRouter initialEntries={[url]} initialIndex={0}>
      <Routes>
        <Route path="a" element={<div>a</div>} />
        <Route path="b" element={<div>b</div>} />
        <Route path="c" element={<div>c</div>} />
      </Routes>
      <Link to="/b">Go</Link>
    </MemoryRouter>
  );
}

describe('MemoryRouter', () => {
  test('Simple', async () => {
    setup('/a');
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.queryByText('b')).toBeNull();
    expect(screen.queryByText('c')).toBeNull();
  });

  test('Navigate', async () => {
    setup('/a');
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.queryByText('b')).toBeNull();
    expect(screen.queryByText('c')).toBeNull();

    fireEvent.click(screen.getByText('Go'));

    expect(screen.queryByText('a')).toBeNull();
    expect(screen.getByText('b')).toBeInTheDocument();
    expect(screen.queryByText('c')).toBeNull();
  });
});
