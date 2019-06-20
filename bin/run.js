#!/usr/bin/env node
/*eslint no-console: 0*/

const argv = require('yargs')
  .usage('Usage: $0 -inputFile [path] -outputFile [path]')
  .demandOption(['inputFile', 'outputFile'])
  .help('h')
  .alias('h', 'help').argv

if (!argv.inputFile) {
  console.log('Missing input file')
}
if (!argv.outputFile) {
  console.log('Missing output file')
}

const HerokuToDotenv = require('../lib/heroku-to-dotenv')

HerokuToDotenv(argv.inputFile, argv.outputFile)
  .then(() => {
    console.log('Done!')
  })
  .catch(err => {
    console.log(err)
  })
