# Clean Architecture

This repository contains the implementation of the Clean Architecture pattern using TypeScript. It's based on the repository for another course, but it's being adapted to use the Clean Architecture pattern.

Original repository: [fc-ddd-patterns](https://github.com/josenaldo/fc-ddd-patterns-jom)

## Repository creation steps

### Create project folder

```bash
mkdir fc-ddd-patterns-jom

code fc-ddd-patterns-jom
```

### Install typescript

```bash
npm install typescript --save-dev
```

### Add gitignore file

```bash
npx gitignore node
```

### Add LICENSE file

```bash
npx license
```

Then, select the license type.

### Add README.md file

```bash
touch README.md
```

### Init typescript project

```bash
npx tsc --init
```

On tsconfig.json file, change the following properties:

```json
"baseUrl": "./src",
"paths": {
      "@/*": ["*"]
},
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
"incremental": true,
"strictNullChecks": false ,
"outDir": "./dist",
"target": "es2022",
```

And add the following properties:

```json
"exclude": ["node_modules"],
"include": ["src/**/*.ts"],
```

Add the `src` folder and create the `index.ts` file.

### Install eslint and typescript-eslint

```bash

npm install --save-dev eslint @eslint/js typescript typescript-eslint prettier eslint-config-prettier;
```

### Init eslint

Create a file named `eslint.config.js` and add the following content:

```javascript
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
);
```

If necessary, add the following properties to the `package.json` file:

```json
type: "module"
```

In the `package.json` file, add the following scripts:

```json
"lint": "eslint .",
"lint:fix": "eslint . --fix"
```

### Install jest and SWC

```bash
npm install jest @types/jest ts-jest --save-dev
npm install @swc/jest @swc/cli @swc/core --save-dev
```

### Init jest

```bash
npx jest --init
```

### Configure SWC

Create a file named `.swcrc` and add the following content:

```json
{
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "decorators": true
    },
    "transform": {
      "legacyDecorator": true,
      "decoratorMetadata": true
    }
  }
}

```

## Compilation

To compile the project, run the following command:

```bash
npx tsc
```

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
