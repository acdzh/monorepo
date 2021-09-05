/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link } from 'gatsby';
import React from 'react';

import './index.css';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const _noop = () => {};

type PaginationItemPropsType = {
  isActive?: boolean;
  inner?: React.ReactNode;
  disabled?: boolean;
};

const PaginationItem: React.FC<PaginationItemPropsType> = ({
  isActive = false,
  inner = null,
  disabled = false,
}) => {
  return (
    <li
      className={`pagination-item ${isActive ? 'pagination-item-active' : ''} ${
        disabled ? 'pagination-item-disabled' : 'pagination-item-enabled'
      }`}
    >
      {inner}
    </li>
  );
};

export type PaginationPropsType = {
  current: number;
  total: number;
  startWith?: number;
  onChange?: (page: number) => void;
  hrefBuilder?: (page: number) => string | undefined;
};

const Pagination: React.FC<PaginationPropsType> = ({
  current,
  total,
  startWith = 1,
  onChange = _noop,
  hrefBuilder,
}) => {
  const canGoPrev = current !== 0;
  const canGoNext = current !== total - 1;
  return (
    <ul className="pagination">
      <PaginationItem
        disabled={!canGoPrev}
        inner={
          canGoPrev ? (
            <Link
              rel="nofollow"
              to={canGoPrev && hrefBuilder && hrefBuilder(current + 1)}
            >
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
            </Link>
          ) : (
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
          )
        }
      />
      {Array.from({ length: total }).map((_, index) => (
        <PaginationItem
          key={index}
          isActive={current === index}
          inner={
            <Link
              rel="nofollow"
              to={hrefBuilder && hrefBuilder(index)}
              onClick={() => {
                onChange(index);
              }}
            >
              {startWith + index}
            </Link>
          }
        />
      ))}
      <PaginationItem
        disabled={!canGoNext}
        inner={
          canGoNext ? (
            <Link
              rel="nofollow"
              to={canGoNext && hrefBuilder && hrefBuilder(current + 1)}
            >
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </Link>
          ) : (
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
          )
        }
      />
    </ul>
  );
};

export default Pagination;
