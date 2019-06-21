#!/usr/bin/env node
/*eslint no-console: 0*/

const argv = require('yargs')
  .usage('Usage: $0 -inputFile [path] -outputFile [path]')
  .help('h')
  .alias('h', 'help')
  .option({
    inputFile: {
      alias: 'input',
      description: '<inputFile> Input file path',
      requiresArg: true,
      required: true
    },
    outputFile: {
      alias: 'output',
      description: '<outputFile> Output file path',
      requiresArg: true,
      required: true
    }
  })
  .demandOption(['inputFile', 'outputFile'])
  .epilog('Source at https://github.com/bertolo1988/heroku-to-dotenv').argv

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
