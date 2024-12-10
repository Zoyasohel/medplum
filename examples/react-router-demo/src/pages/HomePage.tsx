import { Link } from '@medplum/react-router';

export function HomePage(): JSX.Element {
  return (
    <div>
      <h1>Welcome</h1>
      <ul>
        <li>
          <Link to="/Patient/123">Homer Simpson</Link>
        </li>
        <li>
          <Link to="/Patient/456">Marge Simpson</Link>
        </li>
      </ul>
    </div>
  );
}
