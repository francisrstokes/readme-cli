#! /usr/bin/env node

const marked = require('marked');
const TerminalRenderer = require('marked-terminal');

const argParser = require('./arg-parser');
const usage = require('./usage');
const getReadme = require('./get-readme');

marked.setOptions({ renderer: new TerminalRenderer() });

const run = async () => {
  if (process.argv.length < 4) {
    console.log(usage);
    process.exit(1);
  }

  const argsStr = process.argv.slice(2).join(' ');

  let readmeDescriptor;
  try {
    readmeDescriptor = argParser(argsStr);
  } catch (ex) {
    console.log(ex.message);
    process.exit(1);
  }

  try {
    const readme = await getReadme(readmeDescriptor);
    console.log(marked(readme));
  } catch (ex) {
    console.log(`Project ${readmeDescriptor.project} not found!`);
    console.log(usage);
    process.exit(1);
  }
};

run();