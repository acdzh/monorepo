import clsx from 'clsx';
import { Link } from 'gatsby';
import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type PaginationItemPropsType = {
  isActive?: boolean;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  to: string;
};

const PaginationItem: React.FC<PaginationItemPropsType> = ({
  isActive = false,
  className = '',
  children,
  disabled = false,
  to,
}) => {
  const inner = (
    <button
      className={clsx(
        `inline-flex text-lg justify-center items-center
        w-2em h-2em rounded-lg
        shadow focus:outline-none`,
        {
          'hover:bg-gray-100 dark:hover:bg-true-gray-700': !disabled,
          'active:shadow-inner dark:active:shadow-white': !disabled,
          'opacity-70 cursor-not-allowed': disabled,
          'border border-theme-700 dark:border-theme-300': isActive,
        },
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );

  return disabled ? inner : <Link to={to}>{inner}</Link>;
};

const buildHref = (page: number) => (page === 1 ? '/' : `/posts/${page}`);

export type PaginationPropsType = {
  current: number;
  total: number;
};

export const Pagination: React.FC<PaginationPropsType> = ({
  current,
  total,
}) => {
  const canGoPrev = current !== 1;
  const canGoNext = current !== total;
  return (
    <ul className="pagination">
      <PaginationItem
        className="mr-12px"
        to={buildHref(current - 1)}
        disabled={!canGoPrev}
      >
        <FaChevronLeft />
      </PaginationItem>
      {Array.from({ length: total }).map((_, index) => (
        <PaginationItem
          key={index}
          className="mr-12px"
          isActive={current === index + 1}
          disabled={current === index + 1}
          to={buildHref(index + 1)}
        >
          {index + 1}
        </PaginationItem>
      ))}
      <PaginationItem to={buildHref(current + 1)} disabled={!canGoNext}>
        <FaChevronRight />
      </PaginationItem>
    </ul>
  );
};
