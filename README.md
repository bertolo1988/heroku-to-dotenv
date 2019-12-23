# heroku-to-dotenv

Helps to convert heroku configs downloaded using [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) to [dotenv](https://www.npmjs.com/package/dotenv) format.

## Install

npm i -g heroku-to-dotenv

## Help

heroku-to-dotenv --help

## How to use

```
heroku config --app my-app-on-heroku > some-aux-file.txt
heroku-to-dotenv --inputFile some-aux-file.txt --outputFile .env
```
