require('should')
const Utils = require('../lib/utils')

const HerokuToDotenv = require('../lib/heroku-to-dotenv')

describe('HerokuToDotenv', async () => {
  it('should successfully serialize a fake heroku cli config output', async () => {
    const outputFile = `tmp-${new Date().getTime()}.txt`
    await HerokuToDotenv('./test/heroku-cli-config-example.txt', outputFile)
    const data = await Utils.readInputFileLines(outputFile)
    data[0].should.be.eql('MY_VAR1="true"')
    data[1].should.be.eql('MY_VAR2="true"')
    data[2].should.be.eql('MY_VAR3="myrandomkeywithweirdstuff@%&#/()/&%"')
    data[3].should.be.eql(
      'MY_VAR4="AAAAO-sf3VU:AasdadsH-8Apasd-w_0SiRasd4-1nNwxucSYasdadsv_bPvz123rb-eBCPh123-uuqvg0nO_-U7wN7K"'
    )
    data[4].should.be.eql(
      'MY_VAR5="-----BEGIN PRIVATE KEY-----\nMIKKKwIBADANBgkqhkiG9w0BAQEFJJJCBKkwggSlAgEAAoh15QDsTxB+mJ0oaoiK\n3mjDALvvd5H1v0zTZOYx0XtM4CaXloe92Aw819Z8zbLywi3K/axiSwlOESR5nLYI\nTMZcaFCsNZRSgfi18ArvgU0FbMBreAPIKuLup0/9q3rBjxv95MQeVzckN9MiRKcM\nw8IRT93cJ9g2vK/pB9bODwGSGCLvn/UWthr4XRV1O84lmazTWYBJsQf0HX4AxVYi\nZPXcV/NRqPTozFc626IA9lRJ2VqIP5FEQ33jrA4ke9CFJxATx7hFHL0Lz/PYa8+C\nDJobmUJBYkSEPcEgwIOiS84Tdg3j6OaNKbMAKfGNuXgCQxezHDxzxPLLTfEqHKcr\nLJKcb/IVAgMBAAECggEBAK7FEvfuO11m3TGHqIeAhX5oOoU8RL+bwjxaKA0FQsWe\nS657HSPqpfGL2Kt+PYwB7XqM8IbSWt2ur1qYHaS+advTjK0w/xbgP9Y/FQ3MDsvs\n6S8juM60445DQvjgtN0kUn/2FQwuVXLkv3/LUD6piPaIaXqiNp/sckvYAVthioUZ\npo64fQ/5tdqQW9Hn9sw2dWjy4UwEjRpDwVbgYVc63HsBpnba7TeD7eWYUK7qgpmk\nuTHaGGDunwafUq6nvUXNAFaXFOkaYM5LYCemK0mylc3RVsqH92lwbJOVPlMJieN7\nyVNlPM8HJuZ+OTDFUTOHKW0E8IBFVhB+UZhmOEDd5ckCgYEA/lxdMUbka9Gwjx6C\ndVUw4kyAfaAwfPWKwoC+SpNTaMhguHTEoNm49nL36LsZoTTEzHvua4Rj2Wwhah8dmltB1dS3HMZYeFlTwpWBR6rFBTlTRB1KOuSNX/eYs7LLYdDAMTBTHCEyFW92E30+l\nCF8f1F29kNVjXWxd/E/JWO52RZ8CgPPP7dTrPGajJh1Ti1MVcDzRg8N931ttLtow\nk0z3kl5dbqvQDOqAAZOnQJ1vqBQVE9INRAjou+gc6E9HXmRKtmZgSyHGESWmfTnl\ni2c2ZZmoLug1kW0OP553gECjKg0M9ACVj7XsgWB/+RGwB5BunttaFj277pfXTCT8\n4me+Bf+eI8sCgYAYiG4Qn6bOY2YlF6s7h+D0Iq7N7xJeKwycH/C6nqUP2C2aT/rs\nT3OQiZwxnUImk0Fb+6QOSLGcudarMx8WemL4UFcDCFiUjNK9EKI2Aayr0nBqxWKw\npqEJAxdYKRPJeQzmlaZwvXirWJ1FMJhZS1t1jykGfB5eV2JlQIjKBA3yPwKBgQCc\nAXeQtk68mK4NjSFZ7zsLsHdnxQQYoJ0OcoVPKMEm8GLXphbzcdRbKSpt2UZ+KuHy\nx9lKMRaNODu7ahQsE3mErxHKe6T7LbgpujlPafyNUFqbGysmhh8jLMMauVbO03dH\nvnD16MPpMDYEsDQv1fkA79vPxSA/3V9Yb+6Q5rzoAwKBgQCtbkrWrxEauOMqIycO\nhL7ox0lca+r21qK1+M7yhM4oax12rsdeiIS7HblSYUt2TzD//9QuQVtqTBljD6QC\nk8U0nPYLxOG/ZhUOL49slmw71UP5b4mM++lz3/7JSNkYX+wgk9uOjX/KlbNZm24D\npEwjw+ya8SxW0WhthpuPJKqUDA==\n-----END PRIVATE KEY-----\n"'
    )
    data[5].should.be.eql('MY_VAR6="vyutLw0a1DnDjyrYmErHlBwoZQGr2LFc"')
    await Utils.deleteTestFile(outputFile)
  })
})
