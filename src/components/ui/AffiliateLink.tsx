import React from 'react';

interface AffiliateLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function AffiliateLink({
  href,
  className = '',
  children,
  ...props
}: AffiliateLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
