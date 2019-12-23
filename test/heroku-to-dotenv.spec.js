require('should')
const Utils = require('../lib/utils')

const HerokuToDotenv = require('../lib/heroku-to-dotenv')

describe('HerokuToDotenv', async () => {
  it('should transcript a boolean', async () => {
    const outputFile = `tmp-${new Date().getTime()}.txt`
    await HerokuToDotenv('./test/heroku-cli-config-example.txt', outputFile)
    const data = await Utils.readInputFileLines(outputFile)
    data[0].should.be.eql('MY_VAR1="true"')
    data[1].should.be.eql('MY_VAR2="false"')
    await Utils.deleteTestFile(outputFile)
  })

  it('should transcript a string with non alphanumeric chars', async () => {
    const outputFile = `tmp-${new Date().getTime()}.txt`
    await HerokuToDotenv('./test/heroku-cli-config-example.txt', outputFile)
    const data = await Utils.readInputFileLines(outputFile)
    data[2].should.be.eql(
      'MY_VAR3="myrandomkeywithweirdstuff@%&#/()/&%AAAO-s::__:%#$#%!!f3VU:AasdadsH-8Apasd-2"'
    )
    await Utils.deleteTestFile(outputFile)
  })

  it('should transcript a string with a \\n', async () => {
    const outputFile = `tmp-${new Date().getTime()}.txt`
    await HerokuToDotenv('./test/heroku-cli-config-example.txt', outputFile)
    const data = await Utils.readInputFileLines(outputFile)
    data[3].should.be.eql('MY_VAR4="a\\nb"')
    await Utils.deleteTestFile(outputFile)
  })

  it('should transcript 6 lines out of the example file', async () => {
    const outputFile = `tmp-${new Date().getTime()}.txt`
    await HerokuToDotenv('./test/heroku-cli-config-example.txt', outputFile)
    const data = await Utils.readInputFileLines(outputFile)
    data.length.should.be.eql(6)
    await Utils.deleteTestFile(outputFile)
  })

  it('should serialize a fake ssh key', async () => {
    const outputFile = `tmp-${new Date().getTime()}.txt`
    await HerokuToDotenv('./test/heroku-cli-config-example.txt', outputFile)
    const data = await Utils.readInputFileLines(outputFile)
    data[4].should.be.eql(
      'MY_VAR5="-----BEGIN PRIVATE KEY-----\\nMIKKKwIBADANBgkqhkiG9w0BAQEFJJJCBKkwggSlAgEAAoh15QDsTxB+mJ0oaoiK\\n3mjDALvvd5H1v0zTZOYx0XtM4CaXloe92Aw819Z8zbLywi3K/axiSwlOESR5nLYI\\nTMZcaFCsNZRSgfi18ArvgU0FbMBreAPIKuLup0/9q3rBjxv95MQeVzckN9MiRKcM\\nw8IRT93cJ9g2vK/pB9bODwGSGCLvn/UWthr4XRV1O84lmazTWYBJsQf0HX4AxVYi\\nZPXcV/NRqPTozFc626IA9lRJ2VqIP5FEQ33jrA4ke9CFJxATx7hFHL0Lz/PYa8+C\\nDJob==\\n-----END PRIVATE KEY-----\\n"'
    )
    await Utils.deleteTestFile(outputFile)
  })

  it('should transcript a line with a space in between', async () => {
    const outputFile = `tmp-${new Date().getTime()}.txt`
    await HerokuToDotenv('./test/heroku-cli-config-example.txt', outputFile)
    const data = await Utils.readInputFileLines(outputFile)
    data[5].should.be.eql('MY_VAR6="withweirdstu f@%&#/()/&%AAAO-s::__:%#$#%!!f3V"')
    await Utils.deleteTestFile(outputFile)
  })
})
