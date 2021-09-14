import React from 'react';

import { Layout, Header, Content, Footer } from '@components/layout';
import { SEO } from '@components/SEO';

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="404: Not Found" />
      <Header />
      <Content>
        <div className="pt-60px px-40px pb-0 text-center font-mono">
          <h1 className="mb-8px text-4xl text-shadow-md">404 Page Not Found</h1>
          <p className="mb-24px  text-shadow-sm">
            Sorry, nothing could be found...
          </p>
          <img
            src="/404.jpg"
            alt="404"
            className=" mb-24px mx-auto rounded-md shadow-md dark:shadow-white"
          ></img>
          <p className="mb-24px  text-shadow-sm">
            Maybe you&#39;d like to see{' '}
            <a
              target="_blank"
              className="text-xl underline text-theme-800 dark:text-theme-300"
              href="https://bit.ly/go-and-subscribe"
              rel="noreferrer"
            >
              this
            </a>
            .
          </p>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default NotFoundPage;
