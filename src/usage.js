const createUsage = require('command-line-usage');

const config = [
  {
    header: 'readme',
    content: 'Display formatted readmes in the terminal from npm or github'
  },
  {
    header: 'Commands',
    content: [
      '{bold npm} <package name>',
      '{bold github} <username> <package name>',
    ]
  }
];

const usage = createUsage(config);

module.exports = usage;