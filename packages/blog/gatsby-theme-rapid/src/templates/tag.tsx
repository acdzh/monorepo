// sync from ./tag
import React from 'react';
import { graphql } from 'gatsby';
import Link from 'gatsby-link';

import Card from '../components/Card';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { SimpleFeatured } from '../components/Featured';

type TagTemplatePropsType = {
  pageContext: {
    tag: string;
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

const TagTemplate: React.FC<TagTemplatePropsType> = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { totalCount = 0, nodes: posts = [] } = data.allMdx;
  return (
    <Layout>
      <SEO title={`Tag: ${tag}`} />
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
            Tag: {tag} ({totalCount})
          </h1>
          {posts.map((post, index) => (
            <section key={index}>
              <SimpleFeatured post={post} />
            </section>
          ))}
          <section style={{ paddingTop: '20px', fontSize: '14px' }}>
            <Link to="/tags/">
              <i className="fa fa-arrow-left" aria-hidden="true" />
              &nbsp;&nbsp;返回
            </Link>
          </section>
        </div>
      </Card>
    </Layout>
  );
};

export default TagTemplate;

export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      nodes {
        fields {
          slug
          dateFormated
        }
        frontmatter {
          title
          date
        }
      }
    }
  }
`;
