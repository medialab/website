exports.FILE = `
  {
    allFile(filter: {sourceInstanceName: {eq: "assets"}}) {
      edges {
        node {
          base,
          publicURL
        }
      }
    }
  }
`;

exports.ACTIVITIES = `
  {
    allActivitiesJson {
      edges {
        node {
          identifier
          slugs
        }
      }
    }
  }
`;

exports.PEOPLE = `
  {
    allPeopleJson {
      edges {
        node {
          identifier
          slugs
          bio {
            en
            fr
          }
        }
      }
    }
  }
`;

exports.PUBLICATION = `
  {
    allProductionsJson {
      edges {
        node {
          identifier
          slugs
        }
      }
    }
  }
`;

exports.NEWS = `
  {
    allNewsJson {
      edges {
        node {
          identifier
          slugs
        }
      }
    }
  }
`;
