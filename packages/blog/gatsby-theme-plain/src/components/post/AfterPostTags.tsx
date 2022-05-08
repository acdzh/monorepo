import { Link } from 'gatsby';
import React from 'react';
import { FaBookmark, FaTags } from 'react-icons/fa';

const Badge: React.FC<{
  children: React.ReactNode;
  to: string;
}> = ({ children, to }) => (
  <li
    className="
      inline-block mr-8px mb-8px rounded
      border dark:border-true-gray-700
      light:shadow light:active:shadow-inner
      hover:bg-gray-100 dark:hover:bg-true-gray-700
    "
  >
    <Link
      className="
        h-26px px-8px py-2px
        inline-flex justify-center items-center
        hover:text-theme
      "
      to={to}
    >
      {children}
    </Link>
  </li>
);

type AfterPostTagsPropsType = {
  series?: string[];
  tags?: string[];
};

export const AfterPostTags: React.FC<AfterPostTagsPropsType> = ({
  series = [],
  tags = [],
}) => {
  const hasSeries = series.length > 0;
  const hasTags = tags.length > 0;
  if (!hasSeries && !hasTags) return null;
  return (
    <ul
      className="
        flex flex-wrap items-center 
        text-sm text-secondary mb-1em
      "
    >
      {hasSeries && (
        <Badge to="/series">
          <FaBookmark />
        </Badge>
      )}
      {series.map((s) => (
        <Badge key={s} to={`/series/${s}`}>
          {s}
        </Badge>
      ))}
      {hasTags && (
        <Badge to="/tags">
          <FaTags />
        </Badge>
      )}
      {tags.map((t) => (
        <Badge key={t} to={`/tags/${t}`}>
          {t}
        </Badge>
      ))}
    </ul>
  );
};
