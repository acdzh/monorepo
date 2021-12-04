import clsx from 'clsx';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { useTheme } from 'gatsby-plugin-use-dark-mode';
import React from 'react';
import {
  FaBars,
  FaBookmark,
  FaHome,
  FaMoon,
  FaQrcode,
  FaRss,
  FaSearch,
  FaSun,
  FaTags,
  FaTimes,
  FaUser,
} from 'react-icons/fa';
import { useToggle, useWindowScroll } from 'react-use';

import { GraphqlQueryDataType } from '@typings/graphql';

type HeaderLinkItemPropsType = {
  icon: React.ComponentType;
  to: string;
  text: string;
};

const HeaderLinkItem: React.FC<HeaderLinkItemPropsType> = ({
  icon: Icon,
  to,
  text,
}) => {
  return (
    <Link className="<sm:mr-12px mr-24px" to={to}>
      <span className="flex items-center justify-center flex-nowrap text-theme">
        <Icon />
        <span className="text-primary filter-unset ml-4px">{text}</span>
      </span>
    </Link>
  );
};

const HeaderButtonItem: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  return (
    <button
      {...props}
      className={clsx(
        props.className,
        'flex text-lg justify-center items-center',
        'p-0.4em rounded-lg',
        'hover:bg-gray-100 dark:hover:bg-gray-900'
      )}
    />
  );
};

type ExpandNavItemItemPropsType = {
  icon: React.ComponentType;
  to: string;
  text: string;
};

const ExpandNavItem: React.FC<ExpandNavItemItemPropsType> = ({
  icon: Icon,
  to,
  text,
}) => {
  return (
    <Link to={to}>
      <span className="mb-12px flex items-center justify-center flex-nowrap text-theme">
        <Icon />
        <span className="text-primary filter-unset ml-8px">{text}</span>
      </span>
    </Link>
  );
};

export type HeaderPropsType = {
  title?: string;
};

export const Header: React.FC<HeaderPropsType> = ({ title }) => {
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
  const [showExpandNav, toggleShowExpandNav] = useToggle(false);

  const { y } = useWindowScroll();

  return (
    <nav
      className={clsx(
        `w-full 
          fixed top-0 z-100
          backdrop-filter backdrop-blur-xl backdrop-saturate-[1.8]
          bg-primary`,
        {
          'shadow dark:shadow-white': y > 10 || showExpandNav,
        }
      )}
    >
      <div
        className="
          flex justify-between
          h-54px w-full max-w-screen-xl
          mx-auto px-loose
        "
      >
        {/* link items */}
        <div className="<sm:hidden flex flex-row justify-center items-center">
          <HeaderLinkItem icon={FaHome} to="/" text={siteMetadata.title} />
          <HeaderLinkItem icon={FaBookmark} to="/series" text="系列" />
          <HeaderLinkItem icon={FaTags} to="/tags" text="标签" />
          <HeaderLinkItem icon={FaUser} to="/about" text="关于" />
          <HeaderLinkItem icon={FaRss} to="/rss" text="RSS" />
        </div>

        {/* left buttons and title */}
        <div className="sm:hidden mr-12px flex flex-row justify-center items-center overflow-hidden">
          <HeaderButtonItem
            className="mr-12px"
            aria-label="打开关闭菜单"
            onClick={toggleShowExpandNav}
          >
            {showExpandNav ? <FaTimes /> : <FaBars />}
          </HeaderButtonItem>
          <div className="leading-57px text-lg truncate">
            {title || siteMetadata.title}
          </div>
        </div>

        {/* right buttons */}
        <div className="flex flex-row justify-center items-center">
          <HeaderButtonItem className="mr-12px" aria-label="搜索">
            <FaSearch />
          </HeaderButtonItem>
          <HeaderButtonItem
            className="<sm:hidden mr-12px"
            aria-label="显示二维码"
          >
            <FaQrcode />
          </HeaderButtonItem>

          <HeaderButtonItem aria-label="切换主题" onClick={toggleTheme}>
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </HeaderButtonItem>
        </div>
      </div>

      {showExpandNav && (
        <nav className="sm:hidden">
          <div
            className="
              w-full max-w-screen-xl
              mx-auto px-loose
            "
          >
            <ExpandNavItem icon={FaHome} to="/" text={siteMetadata.title} />
            <ExpandNavItem icon={FaBookmark} to="/series" text="系列" />
            <ExpandNavItem icon={FaTags} to="/tags" text="标签" />
            <ExpandNavItem icon={FaUser} to="/about" text="关于" />
            <ExpandNavItem icon={FaRss} to="/rss" text="RSS" />
          </div>
        </nav>
      )}
    </nav>
  );
};
