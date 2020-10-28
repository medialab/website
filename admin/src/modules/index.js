import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

export default history =>
  combineReducers({
    router: connectRouter(history),
    test: (state = {hello: 'world'}) => state
  });
