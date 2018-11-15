import React from 'react';
import {Link} from 'gatsby';

import Layout from '../components/layout';

export const query = graphql`
  {
    allPeopleJson {
      edges {
        node {
          id
          firstName
          lastName
        }
      }
    }
    allActivitiesJson {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const IndexPage = ({data}) => {

  const people = data.allPeopleJson.edges.map(e => e.node),
        activities = data.allActivitiesJson.edges.map(e => e.node);

  return (
    <Layout>
      <h1>médialab Static website</h1>
      <h2>People</h2>
      <ul>
        {people.map(p => (
          <li key={p.id}>
            <Link to={`/people-${p.id}`}>{p.firstName} {p.lastName}</Link>
          </li>
        ))}
      </ul>

      <h2>Activities</h2>
      <ul>
        {activities.map(a => (
          <li key={a.id}>
            <Link to={`/activity-${a.id}`}>{a.name}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export default IndexPage;
