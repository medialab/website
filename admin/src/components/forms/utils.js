import get from 'lodash/get';
import set from 'lodash/fp/set';

export function createHandler(scope, key) {
  return e => {
    scope.setState(set(key, e.target.value, scope.state));
  };
}

export function createRawHandler(scope, key) {
  return v => {
    scope.setState(set(key, v, scope.state));
  };
}

export function createAddRelationHandler(scope, key) {
  return id => {
    const data = get(scope.state.data, key, []);

    data.push(id);

    scope.setState(set(['data', key], data, scope.state));
  };
}

export function createDropRelationHandler(scope, key) {
  return id => {
    let data = get(scope.state.data, key, []);

    data = data.filter(i => i !== id);

    scope.setState(set(['data', key], data, scope.state));
  };
}
