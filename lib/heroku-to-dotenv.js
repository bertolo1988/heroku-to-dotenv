const Utils = require('./utils')

function removeSpacesFromString(input) {
  return input.replace(/\s/g, '')
}

function replaceFirstTwoDots(input) {
  return input.replace(':', '="')
}

function convertHerokuConfigLine(line) {
  line = removeSpacesFromString(line)
  line = replaceFirstTwoDots(line)
  return line.concat('"\n')
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
