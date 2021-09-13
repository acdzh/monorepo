import { graphql, Link, useStaticQuery } from 'gatsby';
import { useTheme } from 'gatsby-plugin-use-dark-mode';
import React from 'react';
import { FaRegSun, FaRegMoon } from 'react-icons/fa';

type HeaderStaticQueryType = {
  site: {
    siteMetadata: {
      title: string;
    };
  };
};

export const Header: React.FC = () => {
  const { site } = useStaticQuery<HeaderStaticQueryType>(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );
  const { siteMetadata } = site;
  const { theme, toggleTheme } = useTheme();
  return (
    <nav
      className="
        w-full 
        fixed top-0
        shadow dark:shadow-white 
        backdrop-filter backdrop-blur-xl backdrop-saturate-[1.8]
        bg-white dark:bg-dark-900 bg-opacity-80 
      "
    >
      <div
        className="
          flex justify-between
          w-full max-w-screen-xl h-54px mx-auto
          px-8px sm:px-16px md:px-32px lg:px-64px xl:px-0
        "
      >
        <div className="flex flex-row justify-center items-center text-theme-800 dark:text-theme-300 text-lg">
          <Link className="mr-12px" to="/">
            {siteMetadata.title}
          </Link>
          <Link className="mr-12px" to="/series">
            系列
          </Link>
          <Link className="mr-12px" to="/tags">
            标签
          </Link>
          <Link className="mr-12px" to="/about">
            关于
          </Link>
          <Link className="<sm:hidden mr-12px" to="/rss.xml">
            RSS
          </Link>
        </div>
        <div className="flex flex-row justify-center items-center">
          <button
            className="flex text-lg justify-center items-center p-0.4em rounded-lg hover:bg-light-900 dark:hover:bg-dark-900"
            aria-label="切换主题"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <FaRegSun /> : <FaRegMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
};
