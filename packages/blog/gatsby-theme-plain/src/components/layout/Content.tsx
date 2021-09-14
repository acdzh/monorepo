import clsx from 'clsx';
import React from 'react';

export type ContentPropsType = {
  children: React.ReactNode;
  className?: string;
};

export const Content: React.FC<ContentPropsType> = ({
  children,
  className,
}) => {
  return <main className={clsx('mt-54px', className)}>{children}</main>;
};
