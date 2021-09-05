import React from 'react';

import './content.css';

export type LayoutContentPropsType = {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
};

export const Content: React.FC<LayoutContentPropsType> = ({
  children,
  sidebar,
}) => {
  return (
    <div className="content-main-container">
      <main
        className="content-main"
        style={{ display: 'flex', flexDirection: 'row' }}
      >
        <div style={{ flex: 1 }}>{children}</div>
        {sidebar && <div className="content-main-sidebar">{sidebar}</div>}
      </main>
    </div>
  );
};
