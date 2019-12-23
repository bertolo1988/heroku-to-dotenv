const Utils = require('./utils')

function isWhiteSpaceAt(input, i) {
  return input.charAt(i) === ' '
}

function splitKeyValuePair(input) {
  let indexOfTwoDots = input.indexOf(':')
  return [input.substr(0, indexOfTwoDots), input.substr(indexOfTwoDots + 1)]
}

function getFirstNonWhiteSpaceCharBegin(input) {
  for (let i = 0; i < input.length; i++) {
    if (!isWhiteSpaceAt(input, i)) return i
  }
  return -1
}

function getFirstNonWhiteSpaceCharEnd(input) {
  for (let i = input.length - 1; i >= 0; i--) {
    if (!isWhiteSpaceAt(input, i)) return i
  }
  return -1
}

function replaceWhiteSpaces(input) {
  let firstCharFromBegin = getFirstNonWhiteSpaceCharBegin(input)
  let lastCharFromEnd = getFirstNonWhiteSpaceCharEnd(input)
  return input.substr(firstCharFromBegin, lastCharFromEnd)
}

function convertHerokuConfigLine(input) {
  let splittedString = splitKeyValuePair(input)
  return `${splittedString[0].trim()}="${replaceWhiteSpaces(splittedString[1])}"`
}

async function convertHerokuConfigFile(herokuFilePath, outputFilePath) {
  let fileLines = await Utils.readInputFileLines(herokuFilePath)
  let output = ''
  let isFirstLine = true
  for (let line of fileLines) {
    if (!isFirstLine && line.length > 1) output = `${output}${convertHerokuConfigLine(line)}\n`
    isFirstLine = false
  }
  return Utils.writeFile(outputFilePath, output)
}

module.exports = convertHerokuConfigFile
