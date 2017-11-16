const fs = require('fs')
const path = require('path')

// Iterator
function* readByLine(input) {
  
  let lines = input.split('\n')
  let header = lines.shift().split(',')
  let len = header.length
  let j = 0

  while (line = lines[j++]) {
    
    let fields = line.split(',')
    let obj = {}

    for (let i = 0; i < len; i++) {
      obj[header[i]] = fields[i]
    }
    
    yield obj
  }
}

/**
 * Opens csv file with header and converts its contents to json
 * @param {string} inputFile - path to input csv file
 * @param {string} outputFile - path to output json file. Optional
 * @param {function} callback - callback function, returns err, path to output file
 */
const csv2json = (inputFile, outputFile, callback) => {

  // Optional outputFile
  if (!callback && typeof(outputFile) === 'function') {
    callback = outputFile
    outputFile = null
  }

  // Create name for output if not provided
  if (!outputFile) {
    let fname = inputFile.split('.')
    fname.pop()
    fname.join('.')
    outputFile = fname + '.json'
  }

  // Read input file
  return fs.readFile(path.resolve(inputFile), 'utf8', (err, csv) => {

    if (err) {
      return callback(err)
    }

    // Clear different newline types
    csv = csv.split('\r\n').join('\n').split('\n\r').join('\n')

    // Use iterator to create an array of objects
    let [...json] = readByLine(csv)

    // Write to output file
    return fs.writeFile(path.resolve(outputFile), JSON.stringify(json), (err) => {

      if (err) {
        return callback(err)
      }

      return callback(null, outputFile)
    })
  })
}

module.exports = csv2json