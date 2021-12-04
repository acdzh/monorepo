import { Link } from 'gatsby';
import React from 'react';

export type HeaderLinkItemPropsType = {
  icon: React.ComponentType;
  to: string;
  text: string;
};

export const HeaderLinkItem: React.FC<HeaderLinkItemPropsType> = ({
  icon: Icon,
  to,
  text,
}) => {
  return (
    <Link className="<sm:mr-12px mr-24px" to={to}>
      <span className="flex items-center justify-center flex-nowrap text-theme">
        <Icon />
        <span className="text-primary filter-unset ml-4px">{text}</span>
      </span>
    </Link>
  );
};
