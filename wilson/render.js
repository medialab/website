const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');

// TODO: drop require cache
// TODO: replace svg components
// TODO: replace png imports
// TODO: relink CSS stylesheets
exports.renderPage = function(template, data) {
  const Component = require(template).default;

  return renderToStaticMarkup(React.createElement(Component, null, {}));
};
