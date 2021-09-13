import { graphql } from 'gatsby';
import React from 'react';

import { Layout, Header, Content, Footer } from '@components/layout';
import { SEO } from '@components/SEO';
import { WidthDebug } from '@components/WidthDebug';

const IndexPage: React.FC<{ data: GraphqlQueryDataType }> = ({ data }) => {
  return (
    <Layout>
      <SEO title="首页" />
      <Header />
      <Content>
        <WidthDebug />
        <pre>{JSON.stringify(data, null, 2)}</pre>
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
  }
`;
