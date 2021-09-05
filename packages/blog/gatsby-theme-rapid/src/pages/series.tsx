// sync from categories
import React from 'react';
import { graphql } from 'gatsby';
import Link from 'gatsby-link';

import Card from '../components/Card';
import Button from '../components/Button';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

type SeriesPagePropsType = {
  data: {
    allMdx: {
      group: Array<{
        fieldValue: string;
        totalCount: number;
      }>;
    };
  };
};

const SeriesPage: React.FC<SeriesPagePropsType> = ({ data }) => {
  const { group } = data.allMdx;
  return (
    <Layout>
      <SEO title="All Series" />
      <Card>
        <div style={{ padding: '20px 30px 20px 30px' }}>
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
            Series
          </h1>
          {group.map((item) => (
            <Link
              key={item.fieldValue}
              to={`/series/${item.fieldValue.replace(/\s/g, '-')}`}
            >
              <Button type="outline" style={{ margin: '0 10px 10px 0' }}>
                {item.fieldValue} ({item.totalCount})
              </Button>
            </Link>
          ))}
        </div>
      </Card>
    </Layout>
  );
};

export default SeriesPage;

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
