const async = require('async');
const Twitter = require('twitter');
const config = require('config');
let request = require('request');
const cachedRequest = require('cached-request');
const range = require('lodash/range');
const maxBy = require('lodash/maxBy');
const MultiMap = require('mnemonist/multi-map');

const DEV = process.env.NODE_ENV !== 'production';

if (DEV) {
  request = cachedRequest(request);
  request.setCacheDirectory('./.cache');
  request.setValue('ttl', 24 * 60 * 60 * 100);
}

/**
 * GitHub.
 */
const GITHUB_EVENTS_URL = 'https://api.github.com/users/medialab/events';
const GITHUB_REPO_URL = 'https://api.github.com/repos/';
const GITHUB_URL = 'https://github.com/';
const GITHUB_EVENTS_PAGES_TO_FETCH = 2;
const GITHUB_USER_AGENT = 'medialabot';
const GITHUB_REGEX = /github/i;

// Helpers
function paginateGithubEvents(page) {
  if (page === 1)
    return GITHUB_EVENTS_URL;

  return `${GITHUB_EVENTS_URL}?page=${page}`;
}

function extractGithubHandle(url) {
  return url
    .replace(/\/$/, '')
    .split('/')
    .slice(-1)[0]
    .toLowerCase();
}

// Function retrieving GitHub events data and formatting them into our flux
exports.retrieveGithubFluxData = function(people, callback) {

  const peopleIndex = {};

  people.forEach(p => {
    const contact = p.contacts && p.contacts.find(c => GITHUB_REGEX.test(c.label));

    if (!contact)
      return;

    const handle = extractGithubHandle(contact.value)

    peopleIndex[handle] = p.slugs[p.slugs.length - 1];
  });

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
      return callback(err);

    const groups = new MultiMap();

    data.forEach(item => groups.set(item.repo.name, item));

    // 2) Retrieving repo data
    const repoData = {};

    return async.each(groups.keys(), (repo, next) => {

      return request.get(
        {url: GITHUB_REPO_URL + repo, headers: {'User-Agent': GITHUB_USER_AGENT}},
        (err, response, body) => {
          if (err || response.statusCode >= 400)
            return next(err || response.statusCode);

          repoData[repo] = JSON.parse(body);
          return next();
        }
      );
    }, (err) => {
      if (err)
        return callback(err);

      const result = Array.from(groups.associations(), ([repo, events]) => {
        const data = repoData[repo];

        const item = {
          repo: data.name,
          language: data.language,
          url: data.html_url,
          date: maxBy(events, event => event.created_at).created_at,
          count: events.length
        };

        if (data.description)
          item.description = data.description;

        if (data.license && data.license.spdx_id !== 'NOASSERTION')
          item.license = data.license.spdx_id;

        const authors = new Set();

        events.forEach(event => {
          if (event.actor) {
            authors.add(event.actor.login);
          }
        });

        item.authors = Array.from(authors, login => {
          const author = {
            name: login,
            url: GITHUB_URL + login
          };

          // Attempting to match
          const match = peopleIndex[login.toLowerCase()];

          if (match)
            author.slug = match;

          return author;
        });

        return item;
      });

      return callback(null, result);
    });
  });
};

/**
 * Twitter.
 */
const TWITTER_CONFIG = config.get('twitter');

const TWITTER_CLIENT = new Twitter({
  consumer_key: TWITTER_CONFIG.consumerKey,
  consumer_secret: TWITTER_CONFIG.consumerSecret,
  access_token_key: TWITTER_CONFIG.accessTokenKey,
  access_token_secret: TWITTER_CONFIG.accessTokenSecret
});

const URL_REGEX = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
const HANDLE_REGEX = /(?<=^|(?<=[^a-zA-Z0-9-_\.]))@([A-Za-z]+[A-Za-z0-9-_]+)/gi;
const HASHTAG_REGEX = /\B#(\w*[a-zA-Z]+\w*)/gi;

// Helpers
function resolveTweetUrls(tweet) {
  if (tweet.entities && tweet.entities.urls) {
    tweet.entities.urls.forEach(({url, expanded_url}) => {
      tweet.full_text = tweet.full_text.replace(url, expanded_url);
    });
  }

  if (tweet.extended_entities && tweet.extended_entities.media) {
    tweet.extended_entities.media.forEach(({url, expanded_url}) => {
      tweet.full_text = tweet.full_text.replace(url, expanded_url);
    });
  }
}

function convertTweetTextToHtml(text) {
  return text
    .replace(URL_REGEX, '<a href="$&" target="_blank" rel="noopener">$&</a>')
    .replace(HANDLE_REGEX, '<a href="https://twitter.com/$1" target="_blank" rel="noopener">$&</a>')
    .replace(HASHTAG_REGEX, '<a href="https://twitter.com/hashtag/$1" target="_blank" rel="noopener">$&</a>');
}

// Function retrieving Twitter events and formatting them into our flux
exports.retrieveTwitterFluxData = function(callback) {
  const params = {
    include_entities: true,
    screen_name: 'medialab_ScPo',
    tweet_mode: 'extended'
  };

  TWITTER_CLIENT.get('statuses/user_timeline', params, (err, tweets) => {
    if (err)
      return callback(err);

    // Aggregating replying tweets
    const repliedTweetIds = tweets
      .filter(t => t.in_reply_to_status_id_str)
      .map(t => t.in_reply_to_status_id_str);

    const repliedParams = {
      id: repliedTweetIds.join(','),
      include_entities: true,
      tweet_mode: 'extended'
    };

    return TWITTER_CLIENT.get('statuses/lookup', repliedParams, (err, repliedTweets) => {
      const repliedTweetIndex = {};

      repliedTweets.forEach(t => (repliedTweetIndex[t.id_str] = t));

      const result = tweets.map(t => {

        resolveTweetUrls(t);

        const item = {
          tweet: t.id_str,
          text: t.full_text,
          html: convertTweetTextToHtml(t.full_text),
          date: (new Date(t.created_at)).toISOString(),
          retweets: t.retweet_count,
          favorites: t.favorite_count,
          type: 'normal'
        };

        // Replies
        if (t.in_reply_to_status_id_str) {
          const repliedTweet = repliedTweetIndex[t.in_reply_to_status_id_str];

          resolveTweetUrls(repliedTweet);

          item.repliedId = repliedTweet.id;
          item.repliedText = repliedTweet.full_text;
          item.repliedHtml = convertTweetTextToHtml(repliedTweet.full_text);
          item.repliedScreenName = repliedTweet.user.screen_name;
          item.repliedName = repliedTweet.user.name;
          item.type = 'reply';
        }

        // Retweets
        if (t.retweeted_status) {
          resolveTweetUrls(t.retweeted_status);

          item.retweetedText = t.retweeted_status.full_text;
          item.retweetedHtml = convertTweetTextToHtml(t.retweeted_status.full_text);
          item.retweetedScreenName = t.retweeted_status.user.screen_name;
          item.retweetedName = t.retweeted_status.user.name;
          item.type = 'retweet';
        }

        // Quotes
        if (t.quoted_status) {
          resolveTweetUrls(t.quoted_status);

          item.quotedText = t.quoted_status.full_text;
          item.quotedHtml = convertTweetTextToHtml(t.quoted_status.full_text);
          item.quotedScreenName = t.quoted_status.user.screen_name;
          item.quotedName = t.quoted_status.user.name;
          item.type = 'quote';
        }

        return item;
      });

      return callback(null, result);
    });
  });
};
