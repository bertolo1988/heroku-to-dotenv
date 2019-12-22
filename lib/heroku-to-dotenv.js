const Utils = require('./utils')

function replaceAt(input, index, replacement) {
  return input.substr(0, index) + replacement + input.substr(index + replacement.length)
}

function replaceFirstTwoDots(input = '') {
  let indexOfFirstTwoDots = input.indexOf(':')
  return replaceAt(input, indexOfFirstTwoDots, '=')
}

function trimSpaces(input = '') {
  let splittedString = input.split('=')
  return `${splittedString[0].trim()}="${splittedString[1].replace(/ /g, '')}"`
}

function convertHerokuConfigLine(line) {
  line = replaceFirstTwoDots(line)
  line = trimSpaces(line)
  return line.concat('\n')
}

async function convertHerokuConfigFile(herokuFilePath, outputFilePath) {
  let fileLines = await Utils.readInputFileLines(herokuFilePath)
  let output = ''
  let isFirstLine = true
  for (let line of fileLines) {
    if (!isFirstLine) output = `${output}${convertHerokuConfigLine(line)}`
    isFirstLine = false
  }
  return Utils.writeFile(outputFilePath, output)
}

module.exports = convertHerokuConfigFile
