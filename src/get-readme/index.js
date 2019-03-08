const github = require('./github');
const npm = require('./npm');

module.exports = descriptor => {
  if (descriptor.type === 'npm') {
    return npm(descriptor);
  }
  return github(descriptor);
};
