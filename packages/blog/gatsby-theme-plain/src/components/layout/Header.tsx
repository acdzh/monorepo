import clsx from 'clsx';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { useTheme } from 'gatsby-plugin-use-dark-mode';
import React from 'react';
import { FaRegSun, FaRegMoon } from 'react-icons/fa';
import { useWindowScroll } from 'react-use';

import { GraphqlQueryDataType } from '@typings/graphql';

export const Header: React.FC = () => {
  const { site } = useStaticQuery<GraphqlQueryDataType>(
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

  const { y } = useWindowScroll();

  return (
    <nav
      className={clsx(
        `w-full 
        fixed top-0
        backdrop-filter backdrop-blur-xl backdrop-saturate-[1.8]
        bg-white dark:bg-dark-900 bg-opacity-80`,
        {
          'shadow dark:shadow-white': y > 10,
        }
      )}
    >
      <div
        className="
          flex justify-between
          h-54px w-full max-w-screen-xl
          mx-auto my-auto-px
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
