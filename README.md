# heroku-to-dotenv

Converts [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) downloaded config files to [dotenv](https://www.npmjs.com/package/dotenv) format.

## Install

npm i -g heroku-to-dotenv

## Help

heroku-to-dotenv --help

## How to use

heroku-to-dotenv --inputFile myHerokuLog.txt --outputFile .env

## What does it do?

Converts files that look like this:

```
configProperty1:       configValue1
configProperty2:       configValue2
```

to a file like this

```
configProperty1="configValue1"
configProperty2="configValue2"
```
