# Clean Architecture

- [Clean Architecture](#clean-architecture)
  - [Introduction](#introduction)
  - [Commands](#commands)
    - [Installation](#installation)
    - [Running the project](#running-the-project)
    - [Testing](#testing)
    - [Cleaning the project](#cleaning-the-project)
    - [Linting](#linting)
    - [Compilation](#compilation)
  - [Apis](#apis)
  - [References](#references)
  - [Troubleshooting](#troubleshooting)
    - [Resolving `ts-node` Error: `ERR_UNKNOWN_FILE_EXTENSION`](#resolving-ts-node-error-err_unknown_file_extension)
      - [Step 1: Install the `tsconfig-paths` package](#step-1-install-the-tsconfig-paths-package)
      - [Step 2: Configure `nodemon` with a `nodemon.json` file](#step-2-configure-nodemon-with-a-nodemonjson-file)
      - [Step 3: Create a `loader.js` file](#step-3-create-a-loaderjs-file)
      - [Step 4: Update the `package.json` file](#step-4-update-the-packagejson-file)
      - [Step 5: Update the `tsconfig.json` file](#step-5-update-the-tsconfigjson-file)
      - [Step 6: Run the project](#step-6-run-the-project)
      - [References to the solution](#references-to-the-solution)

## Introduction

This repository contains the implementation of the Clean Architecture pattern using TypeScript. It's based on the repository for another course, but it's being adapted to use the Clean Architecture pattern.

Original repository: [fc-ddd-patterns](https://github.com/josenaldo/fc-ddd-patterns-jom)

## Commands

### Installation

To install the project, run the following command:

NPM:

```bash
npm install
```

Yarn:

```bash
yarn
```

### Running the project

To run the project in development mode, use the following command:

NPM:

```bash
npm run dev
```

Yarn:

```bash
yarn dev
```

### Testing

To run the tests, use the following command:

NPM:

```bash
npm test
```

Yarn:

```bash
yarn test
```

### Cleaning the project

To clean the project, use the following command:

NPM:

```bash
npm run clean
```

Yarn:

```bash
yarn clean
```

### Linting

To lint the project, use the following command:

NPM:

```bash
npm run lint
```

Yarn:

```bash
yarn lint
```

### Compilation

To compile the project, run the following command:

```bash
npx tsc
```

## Apis

To create REST APIs, the following libraries can be used:

## References

- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [Prettier](https://prettier.io/)
- [Jest](https://jestjs.io/)
  - [Jest Troubleshooting](https://github.com/jest-community/vscode-jest#troubleshooting)
- [SWC](https://swc.rs/)
- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- [Express](https://expressjs.com/)
- [Express Types](https://www.npmjs.com/package/@types/express)
- [Dotenv](https://www.npmjs.com/package/dotenv)

## Troubleshooting

### Resolving `ts-node` Error: `ERR_UNKNOWN_FILE_EXTENSION`

If you're using Node 18 or higher and encounter the error `ERR_UNKNOWN_FILE_EXTENSION` during project execution, follow these steps to resolve the issue:

#### Step 1: Install the `tsconfig-paths` package

Run the following command in your terminal:

```bash
npm install tsconfig-paths --save-dev
```

If you're using Yarn, use this command instead:

```bash
yarn add tsconfig-paths --dev
```

#### Step 2: Configure `nodemon` with a `nodemon.json` file

Create a `nodemon.json` file in the root folder of the project and add the following content:

```json
{
"verbose": false,
"ignore": ["*.spect.ts"],
"ext": "ts",
"execMap": {
  "ts": "node --experimental-specifier-resolution=node --no-warnings=ExperimentalWarning --loader ./loader.js"
}
```

#### Step 3: Create a `loader.js` file

Create a file named `loader.js` in the root of the project with the following content:

```javascript
import { resolve as resolveTs } from 'ts-node/esm'
import * as tsConfigPaths from 'tsconfig-paths'
import { pathToFileURL } from 'url'

const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig()
const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths)

export function resolve(specifier, ctx, defaultResolve) {
  const match = matchPath(specifier)
  return match
    ? resolveTs(pathToFileURL(`${match}`).href, ctx, defaultResolve)
    : resolveTs(specifier, ctx, defaultResolve)
}

export { load, transformSource } from 'ts-node/esm'

```

#### Step 4: Update the `package.json` file

Add the following configurations in the `package.json` file:

```json
{

  "type": "module",
  "scripts": {
    "dev": "nodemon src/infrastructure/api/server.ts",
  },
}

```

#### Step 5: Update the `tsconfig.json` file

And the following cofingurations in the `tsconfig.json` file:

```json
{
  "module": "nodenext",
  "moduleResolution": "nodenext",
  "ts-node": {
    "esm": true
  },
  "exclude": ["node_modules", "dist"],
  "include": ["src/**/*.ts"]
}
```

#### Step 6: Run the project

To run the project, use the following command:

```bash
npm run dev
```

If you are using Yarn, use the following command:

```bash
yarn dev
```

#### References to the solution

- <https://stackoverflow.com/questions/71571684/ts-node-with-tsconfig-paths-wont-work-when-using-esm>
