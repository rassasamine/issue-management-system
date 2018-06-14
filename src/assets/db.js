module.exports = function() {
    return {
      users: require('./users.json'),
      issues: require('./issues.json'),
      issue: require('./issue.json'),
      comments: require('./comments.json'),
      feed: require('./feed.json')
    }
  }