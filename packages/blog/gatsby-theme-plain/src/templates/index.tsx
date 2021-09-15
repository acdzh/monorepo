import { graphql, Link } from 'gatsby';
import React from 'react';

import { Featured } from '@components/Featured';
import { Layout, Header, Content, Footer } from '@components/layout';
import { SEO } from '@components/SEO';
import { WidthDebug } from '@components/WidthDebug';
import { GraphqlQueryDataType } from '@typings/graphql';

export type IndexPagePropsType = {
  data: GraphqlQueryDataType;
  pageContext: {
    currentPage: number; // start from 1
    totalPage: number;
    limit: number;
    skip: number;
  };
};

const IndexPage: React.FC<IndexPagePropsType> = ({ data, pageContext }) => {
  const { nodes } = data.allMdx;
  const { currentPage, totalPage } = pageContext;
  return (
    <Layout>
      <SEO title="首页" />
      <Header />
      <Content className="w-full max-w-screen-xl mx-auto px-loose py-loose">
        <WidthDebug />
        <ul>
          {nodes.map((node) => (
            <li
              className="block mb-36px sm:mb-48px"
              key={node.frontmatter.title}
            >
              <Featured mdx={node} />
            </li>
          ))}
        </ul>
        <div className="flex flex-row justify-between">
          <span className="hover:text-theme hover:underline-theme">
            {currentPage > 1 && (
              <Link to={currentPage === 2 ? '/' : `/posts/${currentPage - 1}`}>
                ← 上一页
              </Link>
            )}
          </span>
          <span className="hover:text-theme hover:underline-theme">
            {currentPage < totalPage && (
              <Link to={`/posts/${currentPage + 1}`}>下一页 →</Link>
            )}
          </span>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query ($skip: Int = 0, $limit: Int = 20) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { in: [false, null] } } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        excerpt(pruneLength: 240)
        fields {
          slug
        }
        frontmatter {
          date
          description
          title
          update_date
        }
      }
    }
    site {
      siteMetadata {
        postsPerPage
      }
    }
  }
`;
