import get from 'lodash/fp/get';
import set from 'lodash/fp/set';
import sha1 from 'hash.js/lib/hash/sha/1';

export function createHandler(scope, key) {
  return e => {
    scope.setState(set(key, e.target.value, scope.state));
  };
}

export function createSlugRelatedHandler(scope, key, slugify) {
  return e => {
    let newState = set(key, e.target.value, scope.state);

    if (scope.state.isNew)
      newState = set(['data', 'slugs'], [slugify(newState.data)], newState);

    scope.setState(newState);
  };
}

export function createRawHandler(scope, key) {
  return v => {
    scope.setState(set(key, v, scope.state));
  };
}

export function createNegativeHandler(scope, key) {
  return v => {
    scope.setState(set(key, !v, scope.state));
  };
}

export function createAddRelationHandler(scope, key) {
  return id => {
    let data = get(key, scope.state) || [];

    data = data.concat(id);

    scope.setState(set(key, data, scope.state));
  };
}

export function createDropRelationHandler(scope, key) {
  return id => {
    let data = get(key, scope.state) || [];

    data = data.filter(i => i !== id);

    scope.setState(set(key, data, scope.state));
  };
}

export function createHandlers(scope, specs) {
  const handlers = {};

  for (const k in specs) {
    const spec = specs[k],
          field = ['data'].concat(spec.field);

    let handler;

    if (spec.type === 'raw')
      handler = createRawHandler(scope, field);
    else if (spec.type === 'slug')
      handler = createSlugRelatedHandler(scope, field, spec.slugify);
    else if (spec.type === 'boolean')
      handler = createRawHandler(scope, field);
    else if (spec.type === 'negative')
      handler = createNegativeHandler(scope, field);
    else if (spec.type === 'relation')
      handler = {
        add: createAddRelationHandler(scope, field),
        drop: createDropRelationHandler(scope, field)
      };
    else
      handler = createHandler(scope, field);

    handlers[k] = handler;
  }

  return handlers;
}

export function hash(data) {
  const string = JSON.stringify(data);

  return sha1().update(string).digest('hex');
}
