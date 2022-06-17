import get from 'lodash/fp/get';
import set from 'lodash/fp/set';
import unset from 'lodash/fp/unset';
import sha1 from 'hash.js/lib/hash/sha/1';
import {arrayMove} from 'react-sortable-hoc';

export function createHandler(scope, key) {
  return e => {
    const value = e.target.value;

    const newState =
      value === undefined || value === null || value === ''
        ? unset(key, scope.state)
        : set(key, value, scope.state);

    scope.setState(newState);
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

export function getResetState(spec, state) {
  if (!spec.resetField) return state;
  let newState = {...state};
  for (const i in spec.resetField) {
    newState = set(['data', spec.resetField[i]], undefined, newState);
  }
  return newState;
}

export function createRawHandler(scope, key, spec) {
  return v => {
    const state = getResetState(spec, scope.state);
    scope.setState(set(key, v, state));
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

export function createEmptyRelationHandler(scope, key) {
  return () => {
    scope.setState(set(key, undefined, scope.state));
  };
}

export function createArrayMoveHandler(scope, key) {
  return ({oldIndex, newIndex}) => {
    let currentList = get(key, scope.state);
    currentList = arrayMove(currentList, oldIndex, newIndex);

    scope.setState(set(key, currentList, scope.state));
  };
}

export function createHandlers(scope, specs, root = 'data') {
  const handlers = {};

  for (const k in specs) {
    const spec = specs[k],
      field = [root].concat(spec.field);

    let handler;

    if (spec.type === 'raw' || spec.type === 'boolean')
      handler = createRawHandler(scope, field, spec);
    else if (spec.type === 'slug')
      handler = createSlugRelatedHandler(scope, field, spec.slugify);
    else if (spec.type === 'negative')
      handler = createNegativeHandler(scope, field);
    else if (spec.type === 'relation')
      handler = {
        add: createAddRelationHandler(scope, field),
        drop: createDropRelationHandler(scope, field),
        move: createArrayMoveHandler(scope, field),
        empty: createEmptyRelationHandler(scope, field)
      };
    else handler = createHandler(scope, field);

    handlers[k] = handler;
  }

  return handlers;
}

export function hash(data) {
  const string = JSON.stringify(data);

  return sha1().update(string).digest('hex');
}

export const statusLabels = ['publié', 'brouillon'];
