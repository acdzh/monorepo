import clsx from 'clsx';
import React from 'react';

export const HeaderIconButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  return (
    <button
      {...props}
      className={clsx(
        props.className,
        'flex text-lg justify-center items-center',
        'p-0.4em rounded-lg',
        'hover:bg-gray-100 dark:hover:bg-true-gray-700',
        'light:shadow light:active:shadow-inner',
        'focus:outline-none'
      )}
    />
  );
};
