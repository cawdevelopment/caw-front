# Semantic Commit Messages

It is important to maintain an order and consistency in the commit messages.

So, we have decided to use a commit message format based on  [Semantic Commit Messages](https://sparkbox.com/foundry/semantic_commit_messages). 

Furthermore, refer to this [gist](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
for more examples or discussion.

## Types
* **feat**: new feature for the user, not a new feature for build script

* **fix**: bug fix for the user, not a fix to a build script
* **docs**: changes to the documentation
* **style**: formatting, missing semi colons, etc; no production code change
* **refactor**: refactoring production code, eg. renaming a variable
* **test**: adding missing tests, refactoring tests; no production code change
* **chore**: updating grunt tasks etc; no production code change

## Format
 ```hs
    <issue #x | feature #x> is optional
    <type>(issue #x | feature #x): <subject>
    summary : feat: short description of the commit
    description : Include a longer description of the commit if necessary. 

    i.e.
      fix (issue #1): short title of the commit      
 ```
