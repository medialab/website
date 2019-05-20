const async = require('async');
const Twitter = require('twitter');
const config = require('config');
const request = require('request');
const range = require('lodash/range');
const MultiMap = require('mnemonist/multi-map');

/**
 * GitHub.
 */
const GITHUB_EVENTS_URL = 'https://api.github.com/users/medialab/events';
const GITHUB_REPO_URL = 'https://api.github.com/repos/';
const GITHUB_EVENTS_PAGES_TO_FETCH = 2;
const GITHUB_USER_AGENT = 'medialabot';

// Helpers
function paginateGithubEvents(page) {
  if (page === 1)
    return GITHUB_EVENTS_URL;

  return `${GITHUB_EVENTS_URL}?page=${page}`;
}

// Function retrieving GitHub events data and formatting them into our flux
exports.retrieveGithubFluxData = function(callback) {

  // 1) Retrieving events data, paginated
  const eventPages = range(1, GITHUB_EVENTS_PAGES_TO_FETCH + 1).map(page => paginateGithubEvents(page));

  return async.concat(eventPages, (url, next) => {
    request.get({url, headers: {'User-Agent': GITHUB_USER_AGENT}}, (err, response, body) => {
      if (err || response.statusCode >= 400)
        return next(err || [url, response.statusCode]);

      return next(null, JSON.parse(body));
    });
  }, (err, data) => {
    if (err)
      return console.error(err);

    const groups = new MultiMap();

    data.forEach(item => groups.set(item.repo.name, item));

    // 2) Retrieving repo data
    return async.map(groups, (repo, next) => {
      return request.get(
        {url: GITHUB_REPO_URL + repo, headers: {'User-Agent': GITHUB_USER_AGENT}},
        (err, response, body) => {
          if (err || response.statusCode >= 400)
            return next(err || response.statusCode);

          const repoData = JSON.parse(body);

          console.log(repoData)
        }
      );
    });
  });
};

/**
 * Twitter.
 */
console.log(config.get('twitter'));
const TWITTER_CLIENT = new Twitter(config.get('twitter'));

// Function retrieving Twitter events and formatting them into our flux
exports.retrieveTwitterFluxData = function(callback) {

};
