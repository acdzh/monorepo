import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import {
  FaGithub,
  FaGithubAlt,
  FaSteam,
  FaTwitter,
  FaRegEnvelope,
  FaRss,
} from 'react-icons/fa';

import { GraphqlQueryDataType } from '@typings/graphql';
import { SiteMetadata } from '@typings/graphql/site';

const SocialLinks: React.FC<{
  social: SiteMetadata['social'];
}> = ({ social }) => {
  return (
    <>
      <a
        className="group text-lg px-0.4em hover:text-github"
        href={`https://github.com/${social.github}`}
        target="_blank"
        rel="noreferrer"
        title="Github"
      >
        <FaGithub className="inline group-hover:hidden" />
        <FaGithubAlt className="hidden group-hover:inline" />
      </a>
      <a
        className="text-lg px-0.4em hover:text-twitter"
        href={`https://twitter.com/${social.twitter}`}
        target="_blank"
        rel="noreferrer"
        title="Twitter"
      >
        <FaTwitter className="inline" />
      </a>
      <a
        className="text-lg px-0.4em hover:text-steam"
        href={`https://steamcommunity.com/id/${social.steam}`}
        target="_blank"
        rel="noreferrer"
        title="Steam"
      >
        <FaSteam className="inline" />
      </a>
      <a
        className="text-lg px-0.4em hover:text-mail"
        href={`mailto:${social.mail}`}
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
  const { site } = useStaticQuery<GraphqlQueryDataType>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            author {
              name
            }
            social {
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
  const { title, author, social } = siteMetadata;
  return (
    <footer
      className="
          w-full max-w-screen-xl
          mx-auto px-loose py-24px 
          <sm:text-center
          sm:flex sm:flex-row-reverse sm:justify-between
        "
    >
      <section className="<sm:mb-8px">
        <SocialLinks social={social} />
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
