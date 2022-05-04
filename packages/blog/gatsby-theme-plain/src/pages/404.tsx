import React from 'react';

import { Content, Footer, Header, Layout } from '@components/layout';
import { SEO } from '@components/SEO';

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="404: Not Found" />
      <Header />
      <Content>
        <div className="pt-60px px-40px pb-0 text-center font-mono">
          <h1 className="mb-8px text-4xl text-shadow-md">404 Page Not Found</h1>
          <p className="mb-24px text-shadow-sm">页面找不到了啊啊啊</p>
          <img
            src="/404.jpg"
            alt="404"
            className=" mb-24px mx-auto rounded-md light:shadow-md border dark:border-true-gray-700"
          ></img>
          <p className="mb-24px  text-shadow-sm">
            来看看{' '}
            <a
              target="_blank"
              className="text-xl underline text-theme"
              href="https://bit.ly/go-and-subscribe"
              rel="noreferrer"
            >
              这个
            </a>{' '}
            吧.
          </p>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default NotFoundPage;
