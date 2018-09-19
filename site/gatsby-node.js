const path = require('path');

const OWN_TYPES = new Set(['PostsJson', 'PeopleJson', 'ActivitiesJson']);

const POSTS_QUERY = `
  {
    allPostsJson {
      edges {
        node {
          id
        }
      }
    }
  }
`;

const PEOPLE_QUERY = `
 {
  allPeopleJson {
    edges {
      node {
        id
      }
    }
  }
 }
`;

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions;

  const promises = [

    // People
    graphql(PEOPLE_QUERY).then(result => {

      // Creating pages
      result.data.allPeopleJson.edges.forEach(edge => {
        const person = edge.node;

        const slug = `/people-${person.id}/`;

        createPage({
          path: slug,
          component: path.resolve('./src/templates/people.js'),
          context: {
            id: person.id
          }
        });
      });
    }),

    // Posts
    graphql(POSTS_QUERY).then(result => {

      // Creating pages
      result.data.allPostsJson.edges.forEach(edge => {
        const post = edge.node;

        const slug = `/post-${post.id}/`;

        createPage({
          path: slug,
          component: path.resolve('./src/templates/post.js'),
          context: {
            id: post.id
          }
        });
      });
    })
  ];

  return Promise.all(promises);
};
