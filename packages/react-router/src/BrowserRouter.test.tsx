import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from './BrowserRouter';
import { Route } from './Route';
import { Routes } from './Routes';
import { Link } from './Link';

function setup(): void {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>a</div>} />
        <Route path="b" element={<div>b</div>} />
        <Route path="c" element={<div>c</div>} />
      </Routes>
      <Link to="/b">Go</Link>
    </BrowserRouter>
  );
}

describe('BrowserRouter', () => {
  test('Simple', async () => {
    setup();
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.queryByText('b')).toBeNull();
    expect(screen.queryByText('c')).toBeNull();
  });

  test('Navigate', async () => {
    setup();
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.queryByText('b')).toBeNull();
    expect(screen.queryByText('c')).toBeNull();

    fireEvent.click(screen.getByText('Go'));

    expect(screen.queryByText('a')).toBeNull();
    expect(screen.getByText('b')).toBeInTheDocument();
    expect(screen.queryByText('c')).toBeNull();
  });
});
