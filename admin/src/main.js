import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createHashHistory} from 'history';
import {routerMiddleware, ConnectedRouter} from 'connected-react-router';

import client from './client';
import Application from './components/Application';
import createRootReducer from './modules';

// Requiring style
import 'draft-js/dist/Draft.css';
import 'draftail/dist/draftail.css';
import 'react-image-crop/dist/ReactCrop.css';
import '../style/animate.css';
import '../style/main.scss';

const history = createHashHistory();

// Mount node
const MOUNT_NODE = document.getElementById('app');

// Creating redux store
const STORE = createStore(
  createRootReducer(history),
  {},
  compose(
    applyMiddleware(routerMiddleware(history), thunk)
  )
);
window.STORE = STORE;

// Function rendering the application
function renderApplication(Component, props) {
  const block = (
    <Provider store={STORE}>
      <ConnectedRouter history={history}>
        <Component {...props} />
      </ConnectedRouter>
    </Provider>
  );

  render(block, MOUNT_NODE);
}

// First render
let alreadyAuthenticated = false;

client.isLogged((err, logged) => {
  alreadyAuthenticated = logged;
  renderApplication(Application, {alreadyAuthenticated});
});

// Handling HMR
if (module.hot) {

  // Reloading components
  module.hot.accept('./components/Application', () => {
    const NextApplication = require('./components/Application').default;
    renderApplication(NextApplication, {alreadyAuthenticated});
  });

  // Reloading reducers
  module.hot.accept('./modules', () => {
    const nextCreateRootReducer = require('./modules').default;
    STORE.replaceReducer(nextCreateRootReducer(history));
  });
}
