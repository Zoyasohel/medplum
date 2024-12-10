import { useParams } from '@medplum/react-router';

/**
 * This is an example of a generic "Resource Display" page.
 * It uses the Medplum `<ResourceTable>` component to display a resource.
 * @returns A React component that displays a resource.
 */
export function ResourcePage(): JSX.Element | null {
  const { resourceType, id } = useParams();
  return (
    <div>
      Resource page
      <ul>
        <li>Resource Type: {resourceType}</li>
        <li>ID: {id}</li>
      </ul>
    </div>
  );
}
