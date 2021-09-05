import React, { useState } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import { useTheme } from '../../hooks/useTheme';

import './header.css';
import clsx from 'clsx';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { site } = useStaticQuery(
    graphql`
      query {
        avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
          childImageSharp {
            fixed(width: 74, height: 74, quality: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        site {
          siteMetadata {
            title
            author {
              name
            }
            menus {
              name
              url
              icon
            }
            tagLine
          }
        }
      }
    `
  );
  const { siteMetadata: meta } = site;
  const [shouldExpandMenuShow, setShouldExpandMenuShow] = useState(false);
  return (
    <>
      <div
        className={clsx('nav-expand-menu', {
          hidden: !shouldExpandMenuShow,
        })}
      >
        <Link rel="nofollow" to="/">
          <div className="nav-expand-menu-item nav-expand-menu-item-obj">
            <i className="fas fa-home" aria-hidden="true"></i>
            &nbsp;&nbsp;Index
          </div>
        </Link>
        {meta.menus.map((menu) => (
          <Link key={menu.url} rel="nofollow" to={menu.url}>
            <div className="nav-expand-menu-item nav-expand-menu-item-obj">
              {menu.icon && (
                <>
                  <i className={`fas fa-${menu.icon}`} aria-hidden="true"></i>
                  &nbsp;&nbsp;
                </>
              )}
              {menu.name}
            </div>
          </Link>
        ))}
        <div className="nav-expand-menu-item nav-expand-menu-item-text">
          {meta.tagLine}
        </div>
      </div>
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-menu nav-menu-left">
            <button
              className="nav-menu-item nav-menu-item-button nav-menu-item-bar"
              onClick={() => {
                setShouldExpandMenuShow((v) => !v);
              }}
            >
              <i className="fa fa-bars" aria-hidden="true"></i>
            </button>
            <Link rel="nofollow" to="/">
              <div className="nav-menu-item nav-menu-item-obj">
                <i className="fas fa-home" aria-hidden="true"></i>
                &nbsp;&nbsp;Index
              </div>
            </Link>
            {meta.menus.map((menu) => (
              <Link key={menu.url} rel="nofollow" to={menu.url}>
                <div className="nav-menu-item nav-menu-item-obj">
                  {menu.icon && (
                    <>
                      <i
                        className={`fas fa-${menu.icon}`}
                        aria-hidden="true"
                      ></i>
                      &nbsp;&nbsp;
                    </>
                  )}
                  {menu.name}
                </div>
              </Link>
            ))}
            <div className="nav-menu-item nav-menu-item-text">
              {meta.tagLine}
            </div>
          </div>
          <div className="nav-menu nav-menu-right">
            <button
              className="nav-menu-item nav-menu-item-button"
              onClick={() => {
                toggleTheme();
              }}
            >
              <i
                className={clsx('fa', {
                  'fa-sun': theme === 'dark',
                  'fa-moon': theme === 'light',
                })}
                aria-hidden="true"
              ></i>
              {/* &nbsp;&nbsp;
              <i className="fa fa-sun" aria-hidden="true"></i>
              &nbsp;/&nbsp;
              <i className="fa fa-moon" aria-hidden="true"></i>
              &nbsp;&nbsp; */}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
