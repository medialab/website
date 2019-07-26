exports.ACTIVITIES = `
  {
    allActivitiesJson {
      edges {
        node {
          id
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
          id
          slugs
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
          id
          slugs
          external
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
          id
          slugs
        }
      }
    }
  }
`;
