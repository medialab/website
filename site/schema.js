const GraphQLTypes = require('gatsby/graphql');
const _ = require('lodash');

function recurseIntoSchema(model, meta) {

  if (meta.type === 'string')
    return {type: GraphQLTypes.GraphQLString};

  if (meta.type === 'number')
    return {type: GraphQLTypes.GraphQLFloat};

  if (meta.type === 'boolean')
    return {type: GraphQLTypes.GraphQLBoolean};

  // if (meta.type === 'array')
  //   return {type: new GraphQLTypes.GraphQLList(GraphQLTypes.GraphQLString)};

  if (meta.type === 'object') {
    const fields = {};

    for (const k in meta.properties)
      fields[k] = recurseIntoSchema(model, meta.properties[k]);

    return {
      type: new GraphQLTypes.GraphQLObjectType({
        name: model + '__' + _.deburr(meta.title),
        fields
      })
    };
  }
}

exports.graphQLSchemaAdditionFromJsonSchema = function(model, schema) {
  const item = {};

  for (const k in schema.properties) {
    if (k === 'id')
      continue;

    const meta = schema.properties[k];
    const addition = recurseIntoSchema(model, meta);

    if (addition)
      item[k] = addition;
  }

  return item;
};

exports.graphQLSchemaAdditionForSettings = function() {
  return {
    home: {
      type: new GraphQLTypes.GraphQLObjectType({
        name: 'settings__home',
        fields: {
          editorialization: {
            type: new GraphQLTypes.GraphQLList(
              new GraphQLTypes.GraphQLList(GraphQLTypes.GraphQLString)
            )
          }
        }
      })
    }
  };
};
