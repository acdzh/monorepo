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
        {/* material recommended to ＃121212 */}
        <body className="bg-white dark:bg-dark-500 text-gray-900 dark:text-gray-200" />
      </Helmet>
      {children}
    </div>
  );
};
