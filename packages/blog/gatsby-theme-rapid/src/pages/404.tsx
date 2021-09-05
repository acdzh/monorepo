import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="404: Not Found" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontFamily: 'Fira Code',
          justifyContent: 'center',
          paddingTop: '20px',
          textShadow: '0 1px 15px rgba(0,0,0,.12)',
        }}
      >
        <h1
          style={{
            fontSize: '32px',
          }}
        >
          404 Page Not Found
        </h1>
        <p
          style={{
            color: 'var(--Primary)',
            marginBottom: '20px',
          }}
        >
          Sorry, nothing could be found...
        </p>
        <img
          src="/404.jpg"
          alt="404"
          style={{
            borderRadius: '6px',
            boxShadow: '0 1px 5px rgba(0,0,0,.075)',
            border: '1px solid var(--LineSeparatorSecondary)',
          }}
        ></img>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
