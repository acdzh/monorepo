import clsx from 'clsx';
import React from 'react';

export const FooterIconButton: React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement>
> = (props) => {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a
      {...props}
      className={clsx(
        props.className,
        'inline-flex text-lg justify-center items-center',
        'p-0.4em rounded-lg',
        'hover:bg-gray-100 dark:hover:bg-true-gray-700',
        'light:shadow light:active:shadow-inner',
        'focus:outline-none'
      )}
    />
  );
};
