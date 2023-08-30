# React + Vite + Antd + Typescript Admin panel starter 🚀🎉⚡️

**A starter with React + Vite + Antd + Typescript Admin panel!**

## Synopsis

The out of the box admin template developed based on cutting edge technologies such as React18, Antd Design, Typescript, Vite4, and the built-in internationalization, routing permission control and other solutions can meet the needs of most robust admin panel starter!

## Motivation

The motivation for this project is to provide developers with a ready-to-use starter template for building admin panels. By combining React, Vite, Ant Design, and TypeScript, this starter template offers a modern and efficient development environment. It also includes features like built-in internationalization, routing permission control, and other solutions commonly needed in admin panels. By using this starter template, developers can save time and effort in setting up the initial structure and focus more on developing the actual functionalities of their admin panel 💚

## Features

- ✅ [Vite](#vite)
- ✅ [React](#react)
  - `v18` 🔥
- ✅ [TypeScript](#typescript)
- ✅ [Router](#router)
  - `React Router v6`
- ✅ [UI-framework](#ui-framework)
  - `Antd v5`
- ✅ [Store](#store)
  - `Redux with Redux toolkit`
- ✅ [Theme](#theme)
- ✅ [Base file/folder structure](#base-filefolder-structure)
- ✅ [Pages](#pages)
- ✅ [Dev tools](#dev-tools)
  - ✅ eslint
  - ✅ prettier
  - ✅ husky
  - ✅ lint-staged
  - ✅ Commit-lint
  - ✅ Commitizen

[Vite](https://vitejs.dev/) is a blazingly fast build tool based on [native ES modules](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) and [esbuild](https://esbuild.github.io/). `Vite` provides a much better developer experience and it's unconditionally faster.

#### React

The latest version [React](https://reactjs.org/) v18 is used here.

#### TypeScript

"Not using [TypeScript](https://www.typescriptlang.org/) is like driving without a seatbelt" - [Matt Howard](https://twitter.com/MattDotHow).

For those who are not familiar with `TypeScript` - don't worry, you will love it, as we all did. `TypeScript` is a superset of `JavaScript`; it should be very easy to work with if you know `JavaScript`.

#### Router

[React Router v6](https://reactrouter.com/) is used here. You can find routing in the [src/routes](./src/routes/) folder.

#### UI-framework

[Antd](https://ant.design/) v5 is used here. `Ant Design` 5.0 use CSS-in-JS technology to provide dynamic & mix theme ability. And which use component level CSS-in-JS solution get your application a better performance.

#### Store

As a store management tool [Redux Toolkit](https://redux-toolkit.js.org/) is used. Check the [src/store](./src/store) folder for more information.

#### Theme

The [theme system](./src/config/theme/) is based on [Antd Theme](https://ant.design/docs/react/customize-theme).

In version 5.0 we call the smallest element that affects the theme Design Token. By modifying the Design Token, we can present various themes or components. You can pass theme to `ConfigProvider`` to customize theme.

```tsx
import { Button, ConfigProvider, Space } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: '#00b96b',
        borderRadius: 2,

        // Alias Token
        colorBgContainer: '#f6ffed',
      },
    }}
  >
    <Space>
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
    </Space>
  </ConfigProvider>
);
```

Also, you can redefine the theme in the theme configuration file. Check the [src/configs/theme/theme.ts](./src/theme/themes.ts) file for more information.

#### Base file/folder structure

Here how the base file/folder structure looks like:

<!-- Todo: -->

#### Pages

From a layout point of view the application consists of 3 main parts:

- Header
- Sidebar
- Pages

The last one is a router-based switcher. All routes are defined in [src/routes](./src/routes/index.tsx). By default, pages are being loaded lazy via React Lazy loading. You can use it to asynchronously load any `React` component you want. It uses `React.Suspense` and `React.lazy` with some magic 🧙‍♂️

# Dev tools

- [eslint](https://eslint.org/)

  The latest version of `eslint` with the latest recommended collection of `eslint` rules is available out of the box. It contains:

  - 'eslint:recommended',
  - 'plugin:@typescript-eslint/recommended',
  - 'plugin:react-hooks/recommended',
  - 'plugin:import/recommended',
  - 'plugin:markdown/recommended',
  - 'plugin:jsonc/recommended-with-jsonc',

  Check the [.eslintrc.cjs](./.eslintrc.cjs) file for more information.

- [prettier](https://prettier.io/)

  Stop fighting about styling in code reviews; save your time and energy - configure it once and let the machine format/correct your code.

  Check the [.prettierrc.cjs](./.prettierrc.cjs) file for more information.

  There is an additional configuration for your import statements. They will be automatically ordered and grouped by the given rules (check the `.prettierrc.cjs`) - one more topic for debates in code reviews :)

- [husky](https://typicode.github.io/husky/#/)

  You can use it to lint your commit messages, run tests, lint code, etc.

  Currently, only `pre-commit` hook is set up. Every time you try to do a commit it will run `prettier` and `eslint` to be sure that everything is according to the rules.

- [lint-staged](https://github.com/okonet/lint-staged)

  `lint-staged` helps to run `eslint` and `prettier` only on staged files - it makes the linting process super fast and sensible.

- [Commit-lint](https://commitlint.js.org/)

  `Commit-lint` helps to fix the commit message with best pattern.

- [Commitizen](https://cz-git.qbb.sh/cli/)

  `Commitizen` helps to make a better commit message.

## Usage

You need fork/clone this repo.

Install dependencies:

```bash
npm install # or yarn or pnpm install
```

In order to run it in development, run:

```bash
npm run dev # or yarn dev or pnpm run dev
```

In order to do a production build, run:

```bash
npm run build # yarn build or pnpm run build
```

In order to generate changelog, run:

```bash
npm run log # yarn log or pnpm run log
```

In order to generate changelog, run:

```bash
npm run log # yarn log or pnpm run log
```

In order to type check, run:

```bash
npm run tsc # yarn tsc or pnpm run tsc
```

In order to commit, run:

```bash
npm run cz # yarn cz or pnpm run cz
```

There are two more scripts:

`preview` and `lint`

- `preview` command will boot up local static web server that serves the files from `dist` folder. It's an easy way to check if the production build looks OK in your local environment.
