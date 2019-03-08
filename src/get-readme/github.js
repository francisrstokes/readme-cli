const fetch = require('isomorphic-fetch');

const getReadmeUrl = (user, project) => `https://raw.githubusercontent.com/${user}/${project}/master/README.md`;

module.exports = ({ username, project }) => fetch(getReadmeUrl(username, project)).then(res => res.ok
  ? res.text()
  : Promise.reject('Not found')
);
