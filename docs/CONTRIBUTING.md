# Contribution guidelines

First of all, thanks a million for being here.

It is not our intention to discourage you from contributing; however, as the project grows in code and contributors, it is essential to maintain order and consistency. Taking that into account, we have decided to follow some well-known guides we are sure many devs know.

Please take a look at each section :
* [Semantic Commit Messages](COMMITS.md)
* [React Components](REACT.md)
* [Javascript](JS.md)


Don't forget to setup your IDE with `eslint` and `prettier`.

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