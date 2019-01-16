import React from 'react';
import {Link, graphql} from 'gatsby';

import Layout from '../components/Layout';

// NOTE: Helmet can be used in each page!

export const query = graphql`
  {
    allPeopleJson {
      edges {
        node {
          id
          slugs
          firstName
          lastName
        }
      }
    }
    allActivitiesJson {
      edges {
        node {
          id
          slugs
          name
        }
      }
    }
    allProductionsJson {
      edges {
        node {
          id
          slugs
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
          slugs
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

const IndexPage = ({data, pageContext}) => {
  const people = data.allPeopleJson.edges.map(e => e.node),
        activities = data.allActivitiesJson.edges.map(e => e.node),
        productions = data.allProductionsJson.edges.map(e => e.node),
        news = data.allNewsJson.edges.map(e => e.node);

  console.log(pageContext);

  const editorializationList = data.settingsJson.home.editorialization;

  return (
    <Layout>
    <div >
      <h1>médialab Static website</h1>

      <h2>Activities</h2>
      <ul>
        {activities.map(a => (
          <li key={a.id}>
            <Link to={`/activities/${a.slugs[a.slugs.length - 1]}`}>{a.name}</Link>
          </li>
        ))}
      </ul>

      <h2>People</h2>
      <ul>
        {people.map(p => (
          <li key={p.id}>
            <Link to={`/people/${p.slugs[p.slugs.length - 1]}`}>{p.firstName} {p.lastName}</Link>
          </li>
        ))}
      </ul>

      <h2>Productions</h2>
      <ul>
        {productions.map(p => (
          <li key={p.id}>
            <Link to={`/productions/${p.slugs[p.slugs.length - 1]}`}>{p.title.fr || p.title.en}</Link>
          </li>
        ))}
      </ul>

      <h2>News</h2>
      <ul>
        {news.map(n => (
          <li key={n.id}>
            <Link to={`/news/${n.slugs[n.slugs.length - 1]}`}>{n.title.fr || n.title.en}</Link>
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
    </div>
    </Layout>
  );
};

export default IndexPage;
