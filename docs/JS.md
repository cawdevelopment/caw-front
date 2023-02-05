# Javascript/TypeScript Notes

A collection of notes about Javascript and Typescript.

Please code in typescript, and use the `.ts` extension for files, and `.tsx` for react components.

## General
- We use the default vs-code formatter to keep the code style consistent.
- Type your variables and functions, and use the `strict` compiler option.
- Avoid using `any` as much as possible.
- Use `const` for variables that are not going to be reassigned.
- Try to avoid using `var` and `let` as much as possible.
- Code should be self explanatory, avoid using comments unless it's really necessary.
- Use `===` instead of `==` to avoid type coercion.
- Use `null` instead of `undefined` to avoid type coercion.
- Always format your code before committing it.
- - **Use absolute imports** instead of relative imports : `import { formatNumber } from 'src/utils'` instead of `import { formatNumber } from '../../utils'`.


## Naming conventions
- Use camelCase for variables, functions, and filenames.
- Use PascalCase for classes and interfaces.
- Use UPPERCASE for constants and enums.
- Use camelCase for properties, and methods.


## Code style
- Use spaces instead of tabs.
- Mark indentation with 2 spaces
- Use single quotes for strings in js code and double quotes for jsx.

## Functions
- Use arrow functions instead of function declarations.
- Use default parameters instead of checking if the parameter is undefined.
- Use rest parameters instead of the `arguments` object.
- Use the spread operators
- Use destructuring to access properties of objects and arrays.
- Use param object destructuring rather than positional arguments.


## Asynchronous methods
- Use `async`/`await` instead of `.then`/`.catch` to avoid callback hell.
- Use `try`/`catch` to handle errors instead of `.catch` to avoid callback hell.
- Use `Promise.all` to run multiple promises in parallel.

## Comments
- Use `//` for single line comments.
- Short comments are usually better, so try to keep them in one line of 60–80 characters.
- Install the [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments) or a similar extension to make your comments more readable.
- Avoid using comments to explain what the code does, use descriptive variable names and functions instead.
- Use comments to explain why the code is doing something, not how.
