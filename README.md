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

Please make sure to run the app in development mode, I'm using MSW to mock the api and it won't work if you run in Production mode.

## Assumptions

- Authentication is out of scope.
- The app looks/behaves as though the user is already logged in (because there is no authentication process at the moment).
- API responses are mocked using MSW - actual backend integration is not part of this setup.
- Error handling for API requests is minimal... most responses are assumed to be successful for time/development purposes.
- The app is designed for modern browsers, older browser support is not guaranteed.
- The design is very basic, more functional for now. If this were done properly it would be followed from Figma (or similar).

## Technical decisions

- React + Vite
  - I chose to add Vite for it's tooling, for example, it enables hot module reloading and supports code splitting and optimized production builds, which helps improve load times and performance.
- TypeScript
  - Using TypeScript adds type safety to the project, helping catch errors early and improving code maintainability. It’s especially helpful in larger codebases or when collaborating with a team.
- ContextAPI
  - Due to the nature of the application and the relatively simple state management required, I don't think it's necessary to over-complicate things with something like Redux or Zustand. It would be easy to add Zustand alongside Context API if the app were to scale and the requirements changed.
- Vitest + React Testing Library
  - I chose Vitest because it pairs with Vite... it's fast, has TypeScript support and is similar to Jest (which I've used before). Combined with React Testing Library, it encourages testing from the user’s perspective instead of focusing too much on implementation details, which helps keep tests more meaningful.
- ESlint + Prettier
  - ESlint to enforce best practises and to help catch bugs
    - no-restricted-imports: [Enforce best practises with ESLint](https://mui.com/material-ui/guides/minimizing-bundle-size/#enforce-best-practices-with-eslint)
  - Prettier for formatting.
  - The above tools help keep consistency across the codebase and/or projects.
- Husky
  - Again, just enforcing best practises. Using Husky means best practises are more likely to be followed as they are applied at commit-level, and can help prevent issues with formatting and bugs.
- Material UI / TailwindCSS
  - I chose to go with the combo of Material UI and TailwindCSS because I know that's what you guys are using in your project. As discussed in the interview, I mentioned I hadn't used TailwindCSS for a while, and I have never used MUI. I can see the benefits of MUI when there is no custom component library in place, it helps development time, is responsive and considers accessibility standards.
- React-hook-form & Zod
  - For form handling and validation. React-hook-form is good for giving immediate feedback to users. It's more maintainable and scalable than managing form state and validation manually. It also allows for more easy control over inputs.
- Structure
  - The app structure has been set up for scalability and maintainability. The folder organisation clearly separates concerns, making it easier to locate, modify, and extend functionality as the project grows.

## Accessibility considerations

I've tried my best to adhere to the WAG AA guidelines, for example:

- Considering colour contracts.
- Easily readble text sizes.
- Responsiveness (zooming in).
- Adding a "skip to content" link.
- Making sure the whole site is easily navigatable by keyboard.
  - Tab ordering is correct.
  - Focus states are visible.
  - You can use tab, enter, etc where appropriate.
- The appropriate semantics are used.
- MaterialUI also helps, as their components have accessibility built into their foundations.

## Future considerations

- Integrate real authentication flows and user roles, e.g. JWT or OAuth.
- Add route protection for pages that require authentication.
- Replace MSW mocks with real API endpoints.
- Add better/more robust error handling and loading states for API requests.
- Evaluate using a global state solution like Zustand for caching and managing server state.
- Add end-to-end testing, to help ensure the app works as expected across flows (rather than just unit testing).
- I’d enforce a minimum code-coverage check, either to Husky as a pre-commit, or in the pipeline, so that any PR failing to meet the standard is blocked before merging.
- I'd introduce Storybook, to support a design system by documenting and testing components in isolation (improving consistency and maintainability).
- I’d consider how to package the application for deployment, including whether to target Vercel or Netlify directly or containerise the app with Docker and use Azure or AWS with a CI/CD pipeline to automate releases.
- I'd implement something like [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to help with consistent commit messages.
- The responsiveness of the site UI-wise is not the greatest, but I focused on architecture + functionality over UI.
- Add Sentry for monitoring/error logging.
- Add Analytics to track user behaviour.
