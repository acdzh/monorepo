import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import './footer.css';

const SocialLinks: React.FC = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            social {
              github
              qq
              cnblogs
              weibo
              zhihu
              zhihuzhuanlan
              mail
              steam
              facebook
              linkedin
              instagram
              twitter
            }
          }
        }
      }
    `
  );
  const { siteMetadata: meta } = site;
  const { social } = meta;
  return (
    <div className="footer-sociall-links">
      {social.github && (
        <a
          href={`//github.com/${social.github}/`}
          target="_blank"
          rel="noreferrer"
          title="fork me on github"
        >
          <i className="fab fa-github" aria-disabled></i>
        </a>
      )}
      {social.steam && (
        <a
          href={`//steamcommunity.com/id/${social.steam}/`}
          target="_blank"
          rel="noreferrer"
          title="play games with me"
        >
          <i className="fab fa-steam" aria-disabled></i>
        </a>
      )}

      {social.linkedin && (
        <a
          href={`//linkedin.com/in/${social.linkedin}`}
          target="_blank"
          rel="noreferrer"
          title="Linkedin"
        >
          <i className="fab fa-linkedin" aria-disabled></i>
        </a>
      )}

      {social.instagram && (
        <a
          href={`//instagram.com/${social.instagram}`}
          target="_blank"
          rel="noreferrer"
          title="Instagram"
        >
          <i className="fab fa-instagram" aria-disabled></i>
        </a>
      )}

      {social.facebook && (
        <a
          href={`//www.facebook.com/${social.facebook}`}
          target="_blank"
          rel="noreferrer"
          title="Facebook"
        >
          <i className="fab fa-facebook" aria-disabled></i>
        </a>
      )}

      {social.twitter && (
        <a
          href={`//twitter.com/${social.twitter}`}
          target="_blank"
          rel="noreferrer"
          title="Twitter"
        >
          <i className="fab fa-twitter" aria-disabled></i>
        </a>
      )}

      {social.mail && (
        <a
          href={`mailto:${social.mail}`}
          target="_blank"
          rel="noreferrer"
          title="Mail"
        >
          <i className="far fa-envelope" aria-disabled></i>
        </a>
      )}

      {social.qq && (
        <a
          href={`tencent://message/?uin=57082212&Site=${social.qq}&Menu=yes`}
          target="_blank"
          rel="noreferrer"
          title="QQ"
        >
          <i className="fab fa-qq" aria-disabled></i>
        </a>
      )}

      {social.weibo && (
        <a
          href={`//weibo.com/u/${social.weibo}`}
          target="_blank"
          rel="noreferrer"
          title="微博"
        >
          <i className="fab fa-weibo" aria-disabled></i>
        </a>
      )}

      {social.zhihu && (
        <a
          href={`//zhihu.com/people/${social.zhihu}`}
          target="_blank"
          rel="noreferrer"
          title="知乎"
        >
          <i className="fab fa-zhihu" aria-disabled></i>
        </a>
      )}

      <div style={{ fontSize: '1.1rem', marginTop: 10 }}>
        {social.zhihuzhuanlan && (
          <a
            href={`//zhuanlan.zhihu.com/${social.zhihuzhuanlan}`}
            target="_blank"
            rel="noreferrer"
            title="知乎专栏"
          >
            zhuanlan
          </a>
        )}

        {social.cnblogs && (
          <a
            href={`//cnblogs.com/${social.cnblogs}`}
            target="_blank"
            rel="noreferrer"
            title="博客园"
          >
            cnblogs
          </a>
        )}
      </div>
    </div>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Link to="#" className="footer-back-topp">
        <i className="fas fa-angle-up"></i>
      </Link>
      <section className="footer-container">
        <div className="footer-left-pad">
          <p>Copyright (c) {new Date().getFullYear()}. All rights reserved.</p>
          <p style={{ marginTop: 8 }}>
            Power by&nbsp;
            <a
              href="https://www.gatsbyjs.com/"
              target="_blank"
              rel="noreferrer"
            >
              Gatsby
            </a>
            . Theme&nbsp;
            <a
              rel="noreferrer"
              href="https://github.com/acdzh/gatsby-theme-rapid"
              target="_blank"
            >
              rapid
            </a>
            .
          </p>
        </div>
        <div className="footer-right-pad">
          <SocialLinks />
        </div>
      </section>
    </footer>
  );
};
