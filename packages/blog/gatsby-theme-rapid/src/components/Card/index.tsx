/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useStateSafe } from '../../hooks/useStateSafe';
import clsx from 'clsx';

import './index.css';

export type CardPropsType = {
  topStyle?: 'none' | 'const' | 'primary';
  topInner?: React.ReactNode;
  children?: React.ReactNode;
  bgColor?: string;
  canFold?: boolean;
  defaultFold?: 'auto' | 'never' | 'always';
};

const Card: React.FC<CardPropsType> = ({
  topStyle = 'none',
  topInner = null,
  children,
  bgColor = 'BgPrimary',
  canFold = true,
  defaultFold = 'never',
}) => {
  const [isFolded, setIsFolded] = useStateSafe<boolean>(
    defaultFold === 'auto'
      ? typeof window === 'undefined' || window.innerWidth > 812
        ? false
        : true
      : defaultFold === 'always'
  );

  return (
    <div
      className={clsx('card-container', {
        folded: isFolded,
      })}
      style={{ backgroundColor: `var(--${bgColor})` }}
    >
      {topStyle !== 'none' && (
        <div
          className={clsx(
            'card-container-top',
            `card-container-top__${topStyle}`
          )}
        >
          <div className="card-container-top-inner">{topInner}</div>
          {canFold && (
            <div
              className="card-container-top-fold-button"
              onClick={() => {
                setIsFolded(!isFolded);
              }}
              role="button"
              tabIndex={-1}
            >
              <i
                className={clsx('fa', {
                  'fa-chevron-down': isFolded,
                  'fa-chevron-up': !isFolded,
                })}
                aria-hidden="true"
              ></i>
            </div>
          )}
        </div>
      )}
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
