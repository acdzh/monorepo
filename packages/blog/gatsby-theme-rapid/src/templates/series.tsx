import React from 'react';
import { graphql } from 'gatsby';
import Link from 'gatsby-link';

import Card from '../components/Card';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { SimpleFeatured } from '../components/Featured';

type SeriesTemplatePropsType = {
  pageContext: {
    series: string;
  };
  data: {
    allMdx: {
      totalCount: number;
      nodes: {
        fields: {
          slug: string;
          dateFormated: string;
        };
        frontmatter: {
          title: string;
        };
      }[];
    };
  };
};

const SeriesTemplate: React.FC<SeriesTemplatePropsType> = ({
  pageContext,
  data,
}) => {
  const { series } = pageContext;
  const { totalCount = 0, nodes: posts = [] } = data.allMdx;
  return (
    <Layout>
      <SEO title={`Series: ${series}`} />
      <Card>
        <div style={{ padding: '20px 30px ' }}>
          <h1
            style={{
              textAlign: 'center',
              margin: '10px 0 20px 0',
              fontSize: '32px',
              lineHeight: 1.2,
              fontWeight: 400,
              color: 'var(--TextTitle)',
            }}
          >
            Series: {series} ({totalCount})
          </h1>
          {posts.map((post, index) => (
            <section key={index}>
              <SimpleFeatured post={post} />
            </section>
          ))}
          <section style={{ paddingTop: '20px', fontSize: '14px' }}>
            <Link to="/series/">
              <i className="fa fa-arrow-left" aria-hidden="true" />
              &nbsp;&nbsp;返回
            </Link>
          </section>
        </div>
      </Card>
    </Layout>
  );
};

export default SeriesTemplate;

export const pageQuery = graphql`
  query($series: String) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { series: { in: [$series] } } }
    ) {
      totalCount
      nodes {
        fields {
          slug
          dateFormated
        }
        frontmatter {
          title
        }
      }
    }
  }
`;
