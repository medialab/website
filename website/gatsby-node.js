const path = require('path');

const PAGES_QUERY = `
  {
    allPagesJson {
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
    result.data.allPagesJson.edges.forEach(edge => {
      const page = edge.node;

      const slug = `/page-${page.identifier}/`;

      createPage({
        path: slug,
        component: path.resolve('./src/templates/page.js'),
        context: {
          identifier: page.identifier
        }
      });
    });
  });
};
