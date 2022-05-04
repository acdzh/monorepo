import clsx from 'clsx';
import React from 'react';
import { useLockBodyScroll } from 'react-use';

import { Portal, PortalPropsType } from './Portal';

export type ModalPropsType = {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  center?: boolean;
  isTransparent?: boolean;
  onDismiss?: (event: React.MouseEvent) => void;
  getContainer?: PortalPropsType['getContainer'];
};

export const Modal: React.FC<ModalPropsType> = ({
  center = true,
  children,
  className = '',
  isOpen,
  isTransparent = true,
  onDismiss,
  getContainer,
}) => {
  useLockBodyScroll(isOpen);

  return (
    <Portal getContainer={getContainer}>
      <div
        className={clsx('fixed inset-0 z-200', {
          hidden: !isOpen,
        })}
        aria-hidden={true}
      >
        <div
          className="fixed -z-1 inset-0 bg-black bg-opacity-20"
          onClick={onDismiss}
          aria-hidden={true}
        ></div>
        <div
          className={clsx(
            'absolute text-primary bg-primary shadow dark:shadow-white',
            {
              'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2':
                center,
              glass: isTransparent,
            },
            className
          )}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};
