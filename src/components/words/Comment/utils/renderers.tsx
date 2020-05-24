import React, { memo } from 'react';
import useRedirect from 'components/bindings/utilityHooks/useRedirect';

interface LinkProps {
  children: React.ReactChild;
  href: string;
}

export const Link = memo((props: LinkProps) => {
  const { href, children } = props;
  const redirect = useRedirect(href) as () => void;
  return (
    <a
      href={href}
      onClick={evt => {
        evt.preventDefault();
        redirect();
      }}>
      {children}
    </a>
  );
});
