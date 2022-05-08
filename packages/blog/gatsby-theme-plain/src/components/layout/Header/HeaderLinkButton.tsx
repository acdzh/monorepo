import { Link } from 'gatsby';
import React from 'react';

export type HeaderLinkButtonPropsType = {
  icon: React.ComponentType;
  to: string;
  text: string;
};

export const HeaderLinkButton: React.FC<HeaderLinkButtonPropsType> = ({
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
          light:active:shadow-inner
        "
      >
        <Icon />
        <span className="text-primary filter-unset ml-4px">{text}</span>
      </span>
    </Link>
  );
};
