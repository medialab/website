const path = require('path');

const PAGES_QUERY = `
  {
    allPostsJson {
      edges {
        node {
          identifier
        }
      }
    }
  }
`;

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions;

  return graphql(PAGES_QUERY).then(result => {

    // Creating pages
    result.data.allPostsJson.edges.forEach(edge => {
      const post = edge.node;

      const slug = `/post-${post.identifier}/`;

      createPage({
        path: slug,
        component: path.resolve('./src/templates/post.js'),
        context: {
          identifier: post.identifier
        }
      });
    });
  });
};
