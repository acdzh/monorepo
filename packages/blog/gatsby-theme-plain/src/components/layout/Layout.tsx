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
        {/* material recommended to ＃121212 */}
        <body className="bg-primary text-primary" />
        <link
          href="https://cdn.bootcdn.net/ajax/libs/firacode/6.2.0/fira_code.min.css"
          rel="stylesheet"
        ></link>
      </Helmet>
      {children}
    </div>
  );
};
