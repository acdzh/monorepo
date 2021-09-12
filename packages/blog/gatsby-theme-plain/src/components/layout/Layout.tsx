import React from 'react';
import { Helmet } from 'react-helmet';

export type LayoutPropsType = {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
};

export const Layout: React.FC<LayoutPropsType> = ({ children }) => {
  return (
    <div>
      <Helmet>
        <html lang="zh-CN" />
        <body className="bg-white dark:bg-dark-600 text-gray-800 dark:text-gray-100" />
      </Helmet>
      {children}
    </div>
  );
};
