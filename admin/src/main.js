import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createHashHistory} from 'history';
import {connectRouter, routerMiddleware, ConnectedRouter} from 'connected-react-router';

import Application from './components/Application';
import reducer from './modules';

// Requiring style
import 'draft-js/dist/Draft.css';
import 'draftail/dist/draftail.css';
import '../style/main.scss';

const history = createHashHistory()

// Mount node
const MOUNT_NODE = document.getElementById('app');

// Creating redux store
const STORE = createStore(
  connectRouter(history)(reducer),
  compose(
    applyMiddleware(routerMiddleware(history), thunk)
  )
);
window.STORE = STORE;

// Function rendering the application
function renderApplication(Component) {
  const block = (
    <Provider store={STORE}>
      <ConnectedRouter history={history}>
        <Component />
      </ConnectedRouter>
    </Provider>
  );

  render(block, MOUNT_NODE);
}

// First render
renderApplication(Application);

// Handling HMR
if (module.hot) {

  // Reloading components
  module.hot.accept('./components/Application', () => {
    const NextApplication = require('./components/Application').default;
    renderApplication(NextApplication);
  });

  // Reloading reducers
  module.hot.accept('./modules', () => {
    const nextReducer = require('./modules').default;
    STORE.replaceReducer(nextReducer);
  });
}
