# tictactoe

To create this project I did this:

- Created a new repository on github, with a default readme and Node .gitignore file
- From my projects directory clone it with

    git clone https://github.com/krisnye/tictactoe.git

- Created a typescript config file with

    tsc --init

- Edited the new tsconfig.json to set the input and output folders

    "outDir": "./lib",
    "rootDir": "./src",    

- Created a new package.json file by running

    yarn init
    Used all defaults but changed entry point to lib/Game.js

- Edited the new package.json to add the watch script for auto recompilation and execution

    "scripts": {
        "watch": "tsc -w & nodemon ./lib/Game.js"
    },

-   Created a src directory and wrote the Board.ts and Game.ts files
-   Added a dependency on readline-sync to make reading lines easier.

    yarn add readline-sync

-   added everything to git with

    git add -A

-   checked status of checkins and folders with

    git status

-   committed everything to git with
    
    git commit -am "initial game"

-   pushed everything up to github with

    git push

