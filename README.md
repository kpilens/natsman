<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Warehouse Repository

## Installation

```bash
$ npm install
```

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

# Gotchas

`keepConnectionAlive` to true in TypeOrmModule Options for managing active connection states

- NATS SERVER TESTING: <https://nats-server.staging.kpilens.com>

```sh
# PORTS
8222: admin
4222: server
6222: cluster
```

# Epics

In order to provide tightly coupling and types within the communication of services we can extend the `@MessagePattern` decorator to ensure commands, roles, service names etc are tied to a type (monorepo: shared library stuff).

- Article 1 <https://levelup.gitconnected.com/extending-or-simplifying-typescript-decorators-5e3cff556b96>
- Decorator Composition (Nestjs) - <https://docs.nestjs.com/custom-decorators#decorator-composition>
