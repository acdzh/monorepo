import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import {
  FaGithub,
  FaGithubAlt,
  FaSteam,
  FaTwitter,
  FaRegEnvelope,
  FaRss,
} from 'react-icons/fa';

type SocialLinksType = {
  github: string;
  twitter: string;
  steam: string;
  mail: string;
};

type StaticQueryType = {
  site: {
    siteMetadata: {
      title: string;
      author: {
        name: string;
        github: string;
      };
      socialLinks: SocialLinksType;
    };
  };
};

const SocialLinks: React.FC<{
  socialLinks: SocialLinksType;
}> = ({ socialLinks }) => {
  return (
    <>
      <a
        className="text-lg px-0.4em hover:text-github"
        href={socialLinks.github}
        target="_blank"
        rel="noreferrer"
        title="Github"
      >
        <FaGithub className="inline" />
      </a>
      <a
        className="text-lg px-0.4em hover:text-twitter"
        href={socialLinks.steam}
        target="_blank"
        rel="noreferrer"
        title="Twitter"
      >
        <FaTwitter className="inline" />
      </a>
      <a
        className="text-lg px-0.4em hover:text-steam"
        href={socialLinks.steam}
        target="_blank"
        rel="noreferrer"
        title="Steam"
      >
        <FaSteam className="inline" />
      </a>
      <a
        className="text-lg px-0.4em hover:text-mail"
        href={socialLinks.mail}
        target="_blank"
        rel="noreferrer"
        title="Mail"
      >
        <FaRegEnvelope className="inline" />
      </a>
      <a
        className="text-lg px-0.4em hover:text-rss"
        href="/rss.xml"
        target="_blank"
        rel="noreferrer"
        title="Mail"
      >
        <FaRss className="inline" />
      </a>
    </>
  );
};

export const Footer: React.FC = () => {
  const { site } = useStaticQuery<StaticQueryType>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            author {
              name
            }
            socialLinks {
              github
              twitter
              steam
              mail
            }
          }
        }
      }
    `
  );
  const { siteMetadata } = site;
  const { title, author, socialLinks } = siteMetadata;
  return (
    <footer
      className="
          py-24px 
          <sm:text-center
          sm:flex sm:flex-row-reverse sm:justify-between
          w-full max-w-screen-xl mx-auto
          sm:px-16px md:px-32px lg:px-64px xl:px-0
        "
    >
      <section className="<sm:mb-8px">
        <SocialLinks socialLinks={socialLinks} />
      </section>
      <section
        className="<sm:text-sm
        "
      >
        {title} © {new Date().getFullYear()} {author.name}
      </section>
    </footer>
  );
};
