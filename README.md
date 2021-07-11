## Description

Subgraph-detector is a bot that notifies you when a subgraph is deployed or has a new version.

## Installation

```bash
$ npm install
```
## Set up

Create a bot on discord and copy the credentials for the next step.
Create a .env file based on the .env.example and put the credentials of your bot.
You can find the channelId by activating the Discord Developer mode in settings > advanced.

If you want to be notified only when a new subgraph deployment occurs you can comment `line 18 in src/configs/config.ts`

If you want to be notified as soon as an event happens (not very useful for now IMO)
instead of only when a deployment/version update occurs. You can change the query used `at line 45 in src/app.service.ts` with GET_SUBGRAPHS

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

If you like the idea and would like to see the project evolve, you can contact me on:
- Discord: Huxwell #2172
- Email: huxwell.fsociety@gmail.com
- Buy me a coffee:
  - ens: huxwell.eth
  - address: 0xC9a238405ef9D753D55EC1EB8F7A7b17B8d83E63

## Stay in touch

- Author - [Huxwell](https://twitter.com/huxwell_)

## License

subgraph-detector is [MIT licensed](LICENSE).
