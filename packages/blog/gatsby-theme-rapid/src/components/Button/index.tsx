import React from 'react';
import clsx from 'clsx';
import './index.scss';

type ButtonPropsType = {
  children?: React.ReactNode;
  href?: string;
  type?: 'primary' | 'outline' | 'const';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  round?: boolean;

  className?: string;
  style?: React.CSSProperties;
};

const Button: React.FC<ButtonPropsType> = ({
  children,
  type = 'outline',
  className,
  style = {},
  onClick = null,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx('button', className, {
        'button--primary': type === 'primary',
        'button--outline': type === 'outline',
        'button--const': type === 'const',
      })}
      style={style}
    >
      <div className="button__container">{children}</div>
    </button>
  );
};

export default Button;
