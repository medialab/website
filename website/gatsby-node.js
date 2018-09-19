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

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions;

  return graphql(POSTS_QUERY).then(result => {

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
  });
};
