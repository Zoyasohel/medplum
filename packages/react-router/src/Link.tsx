import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import { useNavigate } from './RouterProvider.context';

export interface LinkProps
  extends Omit<DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, 'href'> {
  readonly to: string;
}

export function Link(props: LinkProps): JSX.Element {
  const { to, children, ...rest } = props;
  const navigate = useNavigate();

  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
