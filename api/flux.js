/* eslint camelcase: 0 */
const async = require('async');
let request = require('request');
const parseCsv = require('csv-parse/lib/sync');
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
const TWITTER_DATA_URL =
  'https://raw.githubusercontent.com/medialab/website-medialab-tweets/main/data/medialab_tweets.csv';

const TWITTER_MEDIA_URL_PATTERN =
  /https:\/\/twitter.com\/[a-zA-Z_0-9]+\/status\/\d+\/(?:photo|video)\/\d+/g;

// Helpers
function resolveTweetUrls(tweet, html = false) {
  const ahref = (url, text) =>
    `<a href="${url}" target="_blank" rel="noopener">${text}</a>`;

  let text = tweet.text;

  if (tweet.links) {
    tweet.links.split('|').forEach(url => {
      text = text.replace(url, html ? ahref(url, url) : url);
    });
  }

  if (tweet.media_urls) {
    const urls = tweet.media_urls.split('|');
    let i = 0;

    text = text.replace(TWITTER_MEDIA_URL_PATTERN, () => {
      const url = urls[i++];

      return html ? ahref(url, 'media') : url;
    });
  }

  return text;
}

function convertTweetTextToHtml(tweet) {
  let tweetText = resolveTweetUrls(tweet, true);

  if (tweet.mentioned_names)
    tweetText = tweetText.replace(
      new RegExp(`(?:@(${tweet.mentioned_names}))\\b`, 'gi'),
      '<a href="https://twitter.com/$1" class="mention" target="_blank" rel="noopener">$&</a>'
    );

  if (tweet.hashtags)
    tweetText = tweetText.replace(
      new RegExp(`(?:#(${tweet.hashtags}))\\b`, 'gi'),
      '<a href="https://twitter.com/hashtag/$1" class="hashtag" target="_blank" rel="noopener">$&</a>'
    );

  return tweetText;
}

// Function retrieving Twitter events and formatting them into our flux
exports.retrieveTwitterFluxData = function (callback) {
  return request.get({url: TWITTER_DATA_URL}, (err, response, body) => {
    if (err) return callback(err);
    if (response.statusCode !== 200)
      return callback(
        new Error(
          `invalid status for twitter flux data: ${response.statusCode}`
        )
      );

    const tweets = parseCsv(body.toString(), {
      columns: true,
      skip_empty_lines: true
    })
      .filter(t => !t.to_tweetid)
      .slice(0, 20);

    const result = tweets.map(t => {
      const item = {
        tweet: t.id,
        text: resolveTweetUrls(t),
        html: convertTweetTextToHtml(t),
        date: t.local_time,
        retweets: +t.retweet_count,
        favorites: +t.like_count,
        type: 'tweet'
      };

      // Replies
      // NOTE: we don't have enough scraped metadata to deal with replies (code below was not upgraded, beware!)
      // if (t.to_tweetid) {
      //   item.originalTweet = {
      //     tweet: repliedTweet.to_tweetid,
      //     text: resolveTweetUrls(repliedTweet),
      //     html: convertTweetTextToHtml(repliedTweet),
      //     screenName: repliedTweet.user.screen_name,
      //     name: repliedTweet.user.name,
      //     type: 'tweet'
      //   };
      //   item.type = 'reply';
      // }

      // Retweets
      // NOTE: we cannot scrape retweets (code below was not upgraded, beware!)
      // if (t.retweeted_status) {
      //   item.originalTweet = {
      //     tweet: t.retweeted_status.id_str,
      //     text: resolveTweetUrls(t.retweeted_status),
      //     html: convertTweetTextToHtml(t.retweeted_status),
      //     screenName: t.retweeted_status.user.screen_name,
      //     name: t.retweeted_status.user.name,
      //     type: 'tweet'
      //   };
      //   item.type = 'retweet';
      // }

      // Quotes
      if (t.quoted_id) {
        item.text = item.text.split('«')[0].trim();
        item.html = item.html.split('«')[0].trim();

        t.text = t.text
          .split('«')[1]
          .replace('»', '')
          .split(' — https://')[0]
          .trim();

        item.originalTweet = {
          tweet: t.quoted_id,
          text: resolveTweetUrls(t),
          html: convertTweetTextToHtml(t),
          screenName: t.quoted_user,
          name: t.quoted_user,
          type: 'tweet'
        };
        item.type = 'quote';
      }

      return item;
    });

    return callback(null, result);
  });
};


/**
 * Bluesky.
 */
const BLUESKY_DATA_URL =
  'https://raw.githubusercontent.com/medialab/website-medialab-bsky-posts/main/data/medialab_bsky_posts.csv';

// Helpers
function resolveBlueskyPostsUrls(post, html = false) {
  const ahref = (url, text) =>
    `<a href="${url}" target="_blank" rel="noopener">${text}</a>`;

  let text = post.text;

  if (post.links) {
    post.links.split('|').forEach(url => {
      text = text.replace(url, html ? ahref(url, url) : url);
    });
  }

  return text;
}

function convertBlueskyPostTextToHtml(post) {
  let postText = resolveBlueskyPostsUrls(post, true);

  if (post.mentioned_user_handles)
    for (const handle of post.mentioned_user_handles.split('|')) {
      postText = postText.replace(
        new RegExp(`(?:@(${handle}))\\b`, 'gi'),
        '<a href="https://bsky.app/profile/$1" class="mention" target="_blank" rel="noopener">$&</a>'
      );
    }

  if (post.hashtags)
    for (const hashtag of post.hashtags.split('|'))
      postText = postText.replace(
        new RegExp(`(?:#(${hashtag}))\\b`, 'gi'),
        '<a href="https://bsky.app/hashtag/$1" class="hashtag" target="_blank" rel="noopener">$&</a>'
      );

  return postText;
}

// Function retrieving Bsky events and formatting them into our flux
exports.retrieveBlueskyFluxData = function (callback) {
  return request.get({url: BLUESKY_DATA_URL}, (err, response, body) => {
    if (err) return callback(err);
    if (response.statusCode !== 200)
      return callback(
        new Error(
          `invalid status for bluesky flux data: ${response.statusCode}`
        )
      );

    const posts = parseCsv(body.toString(), {
      columns: true,
      skip_empty_lines: true
    })
      .filter(p => !p.to_postsid)
      .slice(0, 20);

    const result = posts.map(p => {
      const item = {
        post: p.uri,
        post_did: p.did,
        author_handle: p.user_handle,
        text: resolveBlueskyPostsUrls(p),
        html: convertBlueskyPostTextToHtml(p),
        date: p.local_time,
        reposts: +p.repost_count,
        favorites: +p.like_count,
        type: 'post'
      };

      // Quotes
      if (p.quoted_uri) {
        item.text = item.text.split('«')[0].trim();
        item.html = item.html.split('«')[0].trim();

        p.text = p.text
          .split('«')[1]
          .replace('»', '')
          .split(' — https://')[0]
          .trim();

        item.originalPost = {
          post: p.quoted_uri,
          post_did: p.quoted_did,
          text: resolveBlueskyPostsUrls(p),
          html: convertBlueskyPostTextToHtml(p),
          screenName: p.quoted_user_handle,
          name: p.quoted_user_handle,
          type: 'post'
        };
        item.type = 'quote';
      }

      return item;
    });

    return callback(null, result);
  });
};
