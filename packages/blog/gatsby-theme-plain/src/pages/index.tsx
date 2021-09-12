import { graphql } from 'gatsby';
import React from 'react';

import { Layout, Header, Content, Footer } from '@components/layout';
import { SEO } from '@components/SEO';
import { TestText } from '@components/TestText';
import { WidthDebug } from '@components/WidthDebug';

const IndexPage: React.FC = ({}) => {
  return (
    <Layout>
      <SEO title="首页" />
      <Header />
      <Content>
        <WidthDebug />
        <TestText count={20} />
      </Content>
      <Footer />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMdx(filter: { frontmatter: { draft: { in: [false, null] } } }) {
      group(field: frontmatter___series) {
        fieldValue
        totalCount
      }
    }
  }
`;
