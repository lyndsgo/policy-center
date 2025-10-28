# Policy Center

## Prerequisites

Make sure you have the correct version of Node installed, this can be found in the `.nvmrc` file.
If you have `nvm` installed, you can run `nvm use` to easily switch to the correct version.
If you don't have `nvm` installed, [check it out!](https://github.com/nvm-sh/nvm) It's a great tool that allows you to quickly install and use different versions of node via the command line.

## Get started

Install the project's dependancies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Technical decisions

- React + TypeScript + Vite
- ESlint + Prettier
  -- no-restricted-imports: [Enforce best practises with ESLint](https://mui.com/material-ui/guides/minimizing-bundle-size/#enforce-best-practices-with-eslint)
- Husky
- TailwindCSS

- [Linting with type information](https://typescript-eslint.io/getting-started/typed-linting)

## Future considerations
