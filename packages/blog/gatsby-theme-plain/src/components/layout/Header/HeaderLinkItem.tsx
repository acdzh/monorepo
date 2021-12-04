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
    <Link className="<sm:mr-4px mr-16px" to={to}>
      <span
        className="
          my-8px p-8px rounded-lg text-theme
          flex items-center justify-center flex-nowrap
          hover:bg-gray-100 dark:hover:bg-true-gray-700
          active:shadow-inner dark:active:shadow-white
        "
      >
        <Icon />
        <span className="text-primary filter-unset ml-4px">{text}</span>
      </span>
    </Link>
  );
};
