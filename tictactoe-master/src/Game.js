"use strict";
exports.__esModule = true;
var readlineSync = require('readline-sync');
var Board_1 = require("./Board");
var board = new Board_1["default"](10, 10, 10);
// let aiToken: Token = "O"
while (!board.isBombed()) {
    board.render();
    console.log('Enter zero based move: column, row');
    var value = readlineSync.question("");
    var values = value.split(/[ ,]/g);
    var x = parseInt(values[0]);
    var y = parseInt(values[1]);
    board.move(x, y);
}
console.log('game over');
board.render();
