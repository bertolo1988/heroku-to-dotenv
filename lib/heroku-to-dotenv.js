const readline = require('readline')
const fs = require('fs')

function removeSpacesFromString(input) {
  return input.replace(/\s/g, '')
}

function replaceFirstTwoDots(input) {
  return input.replace(':', '="')
}

function convertHerokuConfigLine(line) {
  line = removeSpacesFromString(line)
  line = replaceFirstTwoDots(line)
  return line.concat('"')
}

async function convertHerokuConfigFile(herokuFilePath, outputFilePath) {
  let fileLines = []
  const readInterface = readline.createInterface({
    input: fs.createReadStream(herokuFilePath)
  })
  readInterface.on('line', function(line) {
    fileLines.push(line)
  })
  let output = fs.createWriteStream(outputFilePath)
  for (let line of fileLines) {
    let convertedLine = convertHerokuConfigFile(line)
    output.write(convertedLine)
  }
  return output.end()
}

module.exports = convertHerokuConfigFile
