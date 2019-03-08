const {
  choice,
  sequenceOf,
  toValue,
  str,
  regex,
} = require('arcsecond');

const usage = require('./usage');

const invalidCommand = _ => `Invalid command.\n${usage}`;
const invalidProjectName = _ => `Invalid project name.\n${usage}`;
const invalidUsername = _ => `Invalid username.\n${usage}`;

const space = regex(/^\s+/);
const nameParser = regex(/^[a-zA-Z0-9\-_]+/);

const npmParser = sequenceOf([
  str('npm').leftMap(invalidCommand),
  space,
  nameParser.leftMap(invalidProjectName)
]).map(([_, __, project]) => ({
  type: 'npm',
  project
}));

const githubParser = sequenceOf([
  str('github').leftMap(invalidCommand),
  space,
  nameParser.leftMap(invalidUsername),
  space,
  nameParser.leftMap(invalidProjectName)
]).map(([_, __, username, ___, project]) => ({
  type: 'github',
  username,
  project
}));


const parser = choice([
  npmParser,
  githubParser
]);

const parse = argsStr => toValue(parser.run(argsStr));

module.exports = parse;