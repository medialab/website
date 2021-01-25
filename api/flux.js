/* eslint camelcase: 0 */
const async = require('async');
const Twitter = require('twitter');
const config = require('config-secrets');
let request = require('request');
const cachedRequest = require('cached-request');
const range = require('lodash/range');
const maxBy = require('lodash/maxBy');
const minBy = require('lodash/minBy');
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
  if (page === 1) return GITHUB_EVENTS_URL;

  return `${GITHUB_EVENTS_URL}?page=${page}`;
}

function extractGithubHandle(url) {
  return url.replace(/\/$/, '').split('/').slice(-1)[0].toLowerCase();
}

// Function retrieving GitHub events data and formatting them into our flux
exports.retrieveGithubFluxData = function (people, callback) {
  const peopleIndex = {};

  people.forEach(p => {
    const contact =
      p.contacts && p.contacts.find(c => GITHUB_REGEX.test(c.label));

    if (!contact) return;

    const handle = extractGithubHandle(contact.value);

    peopleIndex[handle] = {
      slug: p.slugs[p.slugs.length - 1],
      name: `${p.firstName} ${p.lastName}`
    };
  });

  // 1) Retrieving events data, paginated
  const eventPages = range(1, GITHUB_EVENTS_PAGES_TO_FETCH + 1).map(page =>
    paginateGithubEvents(page)
  );

  return async.concat(
    eventPages,
    (url, next) => {
      request.get(
        {url, headers: {'User-Agent': GITHUB_USER_AGENT}},
        (err, response, body) => {
          if (err || response.statusCode >= 400)
            return next(err || [url, response.statusCode]);

          return next(null, JSON.parse(body));
        }
      );
    },
    (err, data) => {
      if (err) return callback(err);

      const groups = new MultiMap();

      data.forEach(item => groups.set(item.repo.name, item));

      // 2) Retrieving repo data
      const repoData = {};

      return async.each(
        groups.keys(),
        (repo, next) => {
          return request.get(
            {
              url: GITHUB_REPO_URL + repo,
              headers: {'User-Agent': GITHUB_USER_AGENT}
            },
            (githubError, response, body) => {
              if (githubError || response.statusCode >= 400)
                return next(githubError || response.statusCode);

              repoData[repo] = JSON.parse(body);
              return next();
            }
          );
        },
        finalError => {
          if (finalError) return callback(finalError);

          const result = Array.from(groups.associations(), ([repo, events]) => {
            const repoItem = repoData[repo];

            const item = {
              repo: repoItem.name,
              language: repoItem.language,
              url: repoItem.html_url,
              endDate: maxBy(events, event => event.created_at).created_at,
              startDate: minBy(events, event => event.created_at).created_at,
              count: events.length
            };

            if (repoItem.description) item.description = repoItem.description;

            if (repoItem.license && repoItem.license.spdx_id !== 'NOASSERTION')
              item.license = repoItem.license.spdx_id;

            const authors = new Set();

            events.forEach(event => {
              if (event.actor) {
                authors.add(event.actor.login);
              }
            });

            item.authors = Array.from(authors, login => {
              let author = {
                nickname: login,
                url: GITHUB_URL + login
              };

              // Attempting to match
              const match = peopleIndex[login.toLowerCase()];

              if (match) author = {...author, ...match};

              return author;
            });

            return item;
          });

          return callback(null, result);
        }
      );
    }
  );
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

// Helpers
function resolveTweetUrls(tweet, html = false) {
  const ahref = (url, text) =>
    `<a href="${url}" target="_blank" rel="noopener">${text}</a>`;

  let fullText = tweet.full_text;

  if (tweet.entities && tweet.entities.urls) {
    tweet.entities.urls.forEach(({url, expanded_url, display_url}) => {
      fullText = fullText.replace(
        url,
        html ? ahref(expanded_url, display_url) : display_url
      );
    });
  }

  if (tweet.extended_entities && tweet.extended_entities.media) {
    tweet.extended_entities.media.forEach(
      ({url, expanded_url, display_url}) => {
        fullText = fullText.replace(
          url,
          html ? ahref(expanded_url, display_url) : display_url
        );
      }
    );
  }
  return fullText;
}

function convertTweetTextToHtml(tweet) {
  let tweetText = resolveTweetUrls(tweet, true);

  if (tweet.entities.user_mentions.length)
    tweetText = tweetText.replace(
      new RegExp(
        `(?:@(${tweet.entities.user_mentions
          .map(m => m.screen_name)
          .join('|')}))`,
        'gi'
      ),
      '<a href="https://twitter.com/$1" class="mention" target="_blank" rel="noopener">$&</a>'
    );

  if (tweet.entities.hashtags.length)
    tweetText = tweetText.replace(
      new RegExp(
        `(?:#(${tweet.entities.hashtags.map(h => h.text).join('|')}))`,
        'gi'
      ),
      '<a href="https://twitter.com/hashtag/$1" class="hashtag" target="_blank" rel="noopener">$&</a>'
    );

  return tweetText;
}

// Function retrieving Twitter events and formatting them into our flux
exports.retrieveTwitterFluxData = function (callback) {
  const params = {
    include_entities: true,
    screen_name: 'medialab_ScPo',
    tweet_mode: 'extended'
  };

  TWITTER_CLIENT.get('statuses/user_timeline', params, (err, tweets) => {
    if (err) return callback(err);

    // Aggregating replying tweets
    const repliedTweetIds = tweets
      .filter(t => t.in_reply_to_status_id_str)
      .map(t => t.in_reply_to_status_id_str);

    const repliedParams = {
      id: repliedTweetIds.join(','),
      include_entities: true,
      tweet_mode: 'extended'
    };

    return TWITTER_CLIENT.get(
      'statuses/lookup',
      repliedParams,
      (e, repliedTweets) => {
        const repliedTweetIndex = {};

        repliedTweets.forEach(t => (repliedTweetIndex[t.id_str] = t));

        const result = tweets.map(t => {
          const item = {
            tweet: t.id_str,
            text: resolveTweetUrls(t),
            html: convertTweetTextToHtml(t),
            date: new Date(t.created_at).toISOString(),
            retweets: t.retweet_count,
            favorites: t.favorite_count,
            type: 'tweet'
          };

          // Replies
          if (t.in_reply_to_status_id_str) {
            const repliedTweet = repliedTweetIndex[t.in_reply_to_status_id_str];

            item.originalTweet = {
              tweet: repliedTweet.id_str,
              text: resolveTweetUrls(repliedTweet),
              html: convertTweetTextToHtml(repliedTweet),
              screenName: repliedTweet.user.screen_name,
              name: repliedTweet.user.name,
              type: 'tweet'
            };
            item.type = 'reply';
          }

          // Retweets
          if (t.retweeted_status) {
            item.originalTweet = {
              tweet: t.retweeted_status.id_str,
              text: resolveTweetUrls(t.retweeted_status),
              html: convertTweetTextToHtml(t.retweeted_status),
              screenName: t.retweeted_status.user.screen_name,
              name: t.retweeted_status.user.name,
              type: 'tweet'
            };
            item.type = 'retweet';
          }

          // Quotes
          if (t.quoted_status) {
            item.originalTweet = {
              tweet: t.quoted_status.id_str,
              text: resolveTweetUrls(t.quoted_status),
              html: convertTweetTextToHtml(t.quoted_status),
              screenName: t.quoted_status.user.screen_name,
              name: t.quoted_status.user.name,
              type: 'tweet'
            };
            item.type = 'quote';
          }

          return item;
        });

        return callback(null, result);
      }
    );
  });
};
