import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Card from '../components/Card';
import Featured from '../components/Featured';
import Pagination from '../components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BlogIndex: React.FC<any> = ({ data, pageContext }) => {
  const posts = data.allMdx.nodes;

  return (
    <Layout>
      <SEO title="All posts" />
      <Card>
        <div style={{ padding: '20px 30px 20px 30px' }}>
          {posts.map((post, index) => (
            <section key={index}>
              <Featured post={post} />
            </section>
          ))}
          <div style={{ textAlign: 'center' }}>
            <Pagination
              current={pageContext?.currentPage || 0}
              total={pageContext?.totalPage || 1}
              hrefBuilder={(page) => (page === 0 ? '/' : `/posts/${page + 1}`)}
            />
          </div>
        </div>
      </Card>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query($skip: Int = 0, $limit: Int = 8) {
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
          dateFormated
        }
        frontmatter {
          tags
          author
          categories
          cover {
            publicURL
            childImageSharp {
              fixed(width: 172, height: 96, quality: 50) {
                ...GatsbyImageSharpFixed
              }
            }
          }
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
