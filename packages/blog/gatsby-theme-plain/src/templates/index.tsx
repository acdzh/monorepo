import { graphql, Link } from 'gatsby';
import React from 'react';

import { Layout, Header, Content, Footer } from '@components/layout';
import { SEO } from '@components/SEO';
import { WidthDebug } from '@components/WidthDebug';
import { GraphqlQueryDataType } from '@typings/graphql';

export type IndexPagePropsType = {
  data: GraphqlQueryDataType;
};

const IndexPage: React.FC<IndexPagePropsType> = ({ data }) => {
  const { nodes } = data.allMdx;
  return (
    <Layout>
      <SEO title="首页" />
      <Header />
      <Content>
        <WidthDebug />
        <ul className="py-60px px-16px sm:px-32">
          {nodes.map((node) => (
            <li className="block" key={node.frontmatter.title}>
              <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
            </li>
          ))}
        </ul>
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
          tags
          author
          categories
          description
          draft
          series
          slug
          title
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
