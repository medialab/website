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
