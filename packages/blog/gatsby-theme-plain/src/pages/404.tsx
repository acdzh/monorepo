import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { Content, Footer, Header, Layout } from '@components/layout';
import { SEO } from '@components/SEO';

const isSSR = typeof window === 'undefined';

const useNewUrl = () => {
  const [newUrl, setNewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isSSR) return;
    const { href, pathname } = window.location;
    // const href = 'http://localhost:8000/tec/2020-03/sharpshell_tutorial_4/';
    // const pathname = '/tec/2020-03/sharpshell_tutorial_4/';
    if (pathname === '/') return;
    if (pathname.indexOf('/tec/') === 0) {
      setNewUrl(href.replace('/tec/', '/post/'));
    }
  }, []);

  return { newUrl };
};

const Suggestion: React.FC = () => {
  const { newUrl } = useNewUrl();
  const inner = newUrl ? (
    <>
      页面已经被移走了, 三秒后自动跳转. 如果没有跳转, 请点击{' '}
      <Link className="underline text-theme" to={newUrl}>
        这里
      </Link>
      .
      <Helmet>
        <meta httpEquiv="refresh" content={`0;url=${newUrl}`} />
        <link rel="canonical" href={newUrl} />
      </Helmet>
    </>
  ) : (
    <>页面找不到了! </>
  );
  return <p className="mb-24px text-shadow-sm leading-loose">{inner}</p>;
};
const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="404: Not Found" />
      <Header />
      <Content>
        <div className="pt-60px px-40px pb-0 text-center font-mono">
          <h1 className="mb-8px text-4xl text-shadow-md">404 Page Not Found</h1>
          <Suggestion />
          <img
            src="/404.jpg"
            alt="404"
            className=" mb-24px mx-auto rounded-md light:shadow-md border dark:border-true-gray-700"
          ></img>
          <p className="mb-24px  text-shadow-sm">
            或者来看看{' '}
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
