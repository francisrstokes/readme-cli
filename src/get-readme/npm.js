const fetch = require('isomorphic-fetch');

const getNPMInfoURL = project => `http://registry.npmjs.com/${project}`;

module.exports = ({ project }) => fetch(getNPMInfoURL(project)).then(res => res.ok
  ? res.json().then(json => json.readme)
  : Promise.reject('Not found')
);
