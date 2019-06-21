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
  return line.concat('"\n')
}

async function readInputFile(filePath) {
  return new Promise((resolve, reject) => {
    let fileLines = []
    const readInterface = readline.createInterface({
      input: fs.createReadStream(filePath)
    })
    readInterface.on('line', function(line) {
      fileLines.push(line)
    })
    readInterface.on('close', function() {
      resolve(fileLines)
    })
    readInterface.on('error', function(err) {
      reject(err)
    })
  })
}

async function convertHerokuConfigFile(herokuFilePath, outputFilePath) {
  let fileLines = await readInputFile(herokuFilePath)
  let output = fs.createWriteStream(outputFilePath)
  for (let line of fileLines) {
    let convertedLine = convertHerokuConfigLine(line)
    output.write(convertedLine)
  }
  return output.end()
}

module.exports = convertHerokuConfigFile
