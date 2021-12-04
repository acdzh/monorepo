import clsx from 'clsx';
import { graphql, useStaticQuery } from 'gatsby';
import { useTheme } from 'gatsby-plugin-use-dark-mode';
import QRCode from 'qrcode.react';
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

import { ExpandNavItem } from './ExpandNavItem';
import { HeaderIconButton } from './HeaderIconButton';
import { HeaderLinkButton } from './HeaderLinkButton';

import { GraphqlQueryDataType } from '@typings/graphql';

const isSSR = typeof window === 'undefined';

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
  const [isExpandNavShow, toggleIsExpandNavShow] = useToggle(false);
  const [isQrDialogShow, toggleIsQrDialogShow] = useToggle(false);

  const { y } = useWindowScroll();

  return (
    <nav
      className={clsx(`w-full fixed top-0 z-100 glass bg-primary`, {
        shadow: y > 10 || isExpandNavShow,
      })}
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
          <HeaderLinkButton icon={FaHome} to="/" text={siteMetadata.title} />
          <HeaderLinkButton icon={FaBookmark} to="/series" text="系列" />
          <HeaderLinkButton icon={FaTags} to="/tags" text="标签" />
          <HeaderLinkButton icon={FaUser} to="/about" text="关于" />
          <HeaderLinkButton icon={FaRss} to="/rss" text="RSS" />
        </div>

        {/* left buttons and title */}
        <div className="sm:hidden mr-12px flex flex-row justify-center items-center overflow-hidden">
          <HeaderIconButton
            className="mr-12px"
            aria-label="打开关闭菜单"
            onClick={toggleIsExpandNavShow}
          >
            {isExpandNavShow ? <FaTimes /> : <FaBars />}
          </HeaderIconButton>
          <div className="leading-54px text-lg truncate">
            {title || siteMetadata.title}
          </div>
        </div>

        {/* right buttons */}
        <div className="relative flex flex-row justify-center items-center">
          <HeaderIconButton className="mr-12px" aria-label="搜索">
            <FaSearch />
          </HeaderIconButton>

          <HeaderIconButton
            className="<sm:hidden mr-12px"
            aria-label="显示二维码"
            onClick={toggleIsQrDialogShow}
          >
            <FaQrcode />
          </HeaderIconButton>
          <div
            className={clsx(
              '<sm:hidden transition origin-top-right absolute top-64px right-36px text-primary bg-primary shadow glass',
              {
                'opacity-0 transform scale-0': !isQrDialogShow,
              }
            )}
          >
            <div className="p-12px">
              <QRCode
                renderAs="svg"
                bgColor="#fff"
                fgColor="#000"
                size={160}
                includeMargin={true}
                value={isSSR ? '' : location.href}
                imageSettings={{
                  src: '/favicon-32x32.png',
                  height: 32,
                  width: 32,
                  excavate: true,
                }}
              />
            </div>
          </div>

          <HeaderIconButton aria-label="切换主题" onClick={toggleTheme}>
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </HeaderIconButton>
        </div>
      </div>

      {isExpandNavShow && (
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
