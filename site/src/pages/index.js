import React from 'react';
import {Link, graphql} from 'gatsby';

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
    allPublicationsJson {
      edges {
        node {
          id
          title {
            en
            fr
          }
        }
      }
    }
    allNewsJson {
      edges {
        node {
          id
          title {
            en
            fr
          }
        }
      }
    }
    settingsJson {
      home {
        editorialization
      }
    }
  }
`;

const IndexPage = ({data}) => {
  const people = data.allPeopleJson.edges.map(e => e.node),
        activities = data.allActivitiesJson.edges.map(e => e.node),
        publications = data.allPublicationsJson.edges.map(e => e.node),
        news = data.allNewsJson.edges.map(e => e.node);

  const editorializationList = data.settingsJson.home.editorialization;

  return (
    <Layout>
      <h1>médialab Static website</h1>

      <h2>Activities</h2>
      <ul>
        {activities.map(a => (
          <li key={a.id}>
            <Link to={`/activities-${a.id}`}>{a.name}</Link>
          </li>
        ))}
      </ul>

      <h2>People</h2>
      <ul>
        {people.map(p => (
          <li key={p.id}>
            <Link to={`/people-${p.id}`}>{p.firstName} {p.lastName}</Link>
          </li>
        ))}
      </ul>

      <h2>Publications</h2>
      <ul>
        {publications.map(p => (
          <li key={p.id}>
            <Link to={`/publications-${p.id}`}>{p.title.fr || p.title.en}</Link>
          </li>
        ))}
      </ul>

      <h2>News</h2>
      <ul>
        {news.map(n => (
          <li key={n.id}>
            <Link to={`/news-${n.id}`}>{n.title.fr || n.title.en}</Link>
          </li>
        ))}
      </ul>

      <h2>Editorialized List</h2>
      {editorializationList.length === 0 && <p>Empty...</p>}
      <ul>
        {editorializationList.map(([model, id]) => (
          <li key={id}>
            {model} - {id}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default IndexPage;
