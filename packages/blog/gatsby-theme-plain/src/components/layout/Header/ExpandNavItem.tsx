import { Link } from 'gatsby';
import React from 'react';

export type ExpandNavItemItemPropsType = {
  icon: React.ComponentType;
  to: string;
  text: string;
};

export const ExpandNavItem: React.FC<ExpandNavItemItemPropsType> = ({
  icon: Icon,
  to,
  text,
}) => {
  return (
    <Link to={to}>
      <span className="mb-12px flex items-center justify-center flex-nowrap text-theme">
        <Icon />
        <span className="text-primary filter-unset ml-8px">{text}</span>
      </span>
    </Link>
  );
};
