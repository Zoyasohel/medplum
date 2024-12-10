import { Link, Outlet, useParams } from '@medplum/react-router';
import { Fragment } from 'react';

export function PatientPage(): JSX.Element {
  const { id } = useParams();

  return (
    <Fragment key={`patient-${id}`}>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>Patient ID: {id}</div>
      <ul>
        <li>
          <Link to={`/Patient/${id}/overview`}>Overview</Link>
        </li>
        <li>
          <Link to={`/Patient/${id}/timeline`}>Timeline</Link>
        </li>
        <li>
          <Link to={`/Patient/${id}/history`}>History</Link>
        </li>
      </ul>
      <div style={{ width: 400, height: 300, padding: 8, border: '1px solid #800080' }}>
        <Outlet />
      </div>
    </Fragment>
  );
}
