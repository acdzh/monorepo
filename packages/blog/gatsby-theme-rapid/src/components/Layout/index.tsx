import React from 'react';
import { Header } from './Header';
import { Content } from './Content';
import { Footer } from './Footer';

export type LayoutPropsType = {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
};

const Layout: React.FC<LayoutPropsType> = ({ children, sidebar }) => {
  return (
    <div
      className="global-wrapper"
      style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Header></Header>
      <Content sidebar={sidebar}>{children}</Content>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
