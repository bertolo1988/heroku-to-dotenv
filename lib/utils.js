const readline = require('readline')
const fs = require('fs')

async function readInputFileLines(filePath) {
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

function readWholeFileSync(fileName) {
  return fs.readFileSync(fileName, 'utf8')
}

async function readWholeFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) return reject(err)
      else return resolve(data)
    })
  })
}

async function deleteTestFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.unlink(fileName, function(err) {
      if (err) return reject(err)
      else return resolve()
    })
  })
}

async function writeFile(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (err, result) => {
      if (err) return reject(err)
      else return resolve(result)
    })
  })
}

module.exports = {
  readInputFileLines,
  readWholeFileSync,
  readWholeFile,
  deleteTestFile,
  writeFile
}
