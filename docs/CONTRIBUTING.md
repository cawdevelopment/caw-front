# Contribution guidelines

First of all, thanks a million for being here.

It is not our intention to discourage you from contributing; however, as the project grows in code and contributors, it is essential to maintain order and consistency. Taking that into account, we have decided to follow some well-known guides we are sure many devs know.

Please take a look at each section :
* [Semantic Commit Messages](COMMITS.md)
* [Translations](TRANSLATIONS.md)
* [React Components](REACT.md)
* [Javascript](JS.md)


Don't forget to setup your IDE with `eslint`

Please add any other guidelines you think are essential or even improve the ones we have.

## Project structure
- **assets** Usually contains images and icons on SVG/tsx format.
- **components** Contains generic and reusable components used inside the application.
- **config** Contains all the config files and ABIs.
- **context** Global context for the application.
- **hooks** Contains generic hooks.
- **layouts** Since different pages have different layouts, we use this folder to store them.
- **locales** Everything to do with translations, either json or js files.
- **routes** Avoid hard-code routing. Please add it to the path and import it when required.
- **pages** Contains page components for next.js, files in this directory are treated as API routes
- **theme** Contains all the theme related files.
- **sections** Building blocks for each page, they are composed of components.
- **types** Define types, models, interfaces, DTOs, etc.
- **utils** Contains generic utilities functions.

## Naming conventions
- **Components** Use PascalCase for components and its filenames.
- **Hooks** Use camelCase for hooks and their filenames.
- **Files** Use camelCase for filenames.
- **Variables** Use camelCase for variables.
- **Constants** Use UPPERCASE for constants
- **Types** Use PascalCase for types and interfaces.

## Code style
- **Indentation** Use 2 spaces for indentation.
- **Quotes** Use single quotes for strings.
- **Trailing commas** Trailing commas are required for multiline statements and function calls.
- **Semicolons** Semicolons are required.
- **Line length** Keep lines under col 150
- **Curly braces** Use curly braces for all control statements except for single-line statements.
- **Spacing** Use spaces around operators and after commas, semicolons, and colons.
- **Comments** Use JSDoc style comments for functions, methods, and classes, please install `Better Comments` extension for  VSCode to help you with this.

## Commit messages
- **Commit messages** Use [semantic commit messages](COMMITS.md) to make it easier to understand the changes made in each commit.


## Contracts
Teh CAW Protocol is composed of several smart contracts, each one has a specific role in the ecosystem. 
Explore the contracts [here](https://github.com/cawdevelopment/CawUsernames)

## Useful hooks
Some hooks are used to interact with CAW-Protocol. They are located in `hooks/contracts/` folder. Please use them to read and write data from/to the blockchain.
- **useCawNameMinterContract** `Mintable CAW` Cost of name, validate and mint a name 
- **useCawNamesContract** `CAW NAME ` NFT contract, get account usernames, username uri, balance, actions, etc.
- **useMintableCAWContract** Mint mCAW to mint a username, burn CAW to release a username, approve and transfer mCAW.
- **useAccountBalance** Get primary account balance so as to use the platform (CAW, mCAW, ETH)
- **useETHBalance** Get ETH balance of the connected account
- **useAppConfigurations** Site settings, such as api keys, contract addresses, etc. usually set in the .env file

## Layouts
- **DashboardLayout** Main layout for the application, it contains the header, sidebar, footer, and the main content.
- **LandingLayout**  Layout for the landing page, information about the project, etc.
- **LogoOnlyLayout**  Header only layout, used for the login, register, auth pages, etc.

When creating a new page, please use the corresponding layout.
```tsx
import PageWrapper, { Layout } from 'src/components/wrappers/Page';

MyPage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="logoOnly">{page}</Layout>;
};
```
