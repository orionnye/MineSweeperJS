"use strict";
exports.__esModule = true;
var Board = /** @class */ (function () {
    function Board(width, height, bombCount) {
        //Board Properties
        this.rowValues = [];
        this.displayRows = [];
        //Pushes the empty values base for the Board
        for (var h = 0; h < height; h++) {
            var row = [];
            var displayRow = [];
            for (var w = 0; w < width; w++) {
                row.push(0);
                displayRow.push("#");
            }
            this.rowValues.push(row);
            this.displayRows.push(displayRow);
        }
        //Pushes random Bombs onto the grid
        for (var b = 0; b < bombCount; b++) {
            var mineX = Math.floor(Math.random() * width);
            var mineY = Math.floor(Math.random() * height);
            this.rowValues[mineY][mineX] = "B";
        }
        //Counts surrounding Bombs and reassigns value
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                var bombDanger = 0;
                //up
                if (y > 0 && this.rowValues[y - 1][x] == "B")
                    bombDanger += 1;
                //down
                if (y < height - 1 && this.rowValues[y + 1][x] == "B")
                    bombDanger += 1;
                //left
                if (x > 0 && this.rowValues[y][x - 1] == "B")
                    bombDanger += 1;
                //right
                if (x < width - 1 && this.rowValues[y][x + 1] == "B")
                    bombDanger += 1;
                //upper
                if (y > 0) {
                    //left
                    if (x > 0 && this.rowValues[y - 1][x - 1] == "B")
                        bombDanger += 1;
                    //right
                    if (x < width - 1 && this.rowValues[y - 1][x + 1] == "B")
                        bombDanger += 1;
                }
                //lower
                if (y < height - 1) {
                    //left
                    if (x > 0 && this.rowValues[y + 1][x - 1] == "B")
                        bombDanger += 1;
                    //right
                    if (x < width && this.rowValues[y + 1][x + 1] == "B")
                        bombDanger += 1;
                }
                if (this.rowValues[y][x] != "B") {
                    this.rowValues[y][x] = bombDanger;
                }
            }
        }
    }
    Board.prototype.move = function (x, y) {
        this.displayRows[y][x] = this.rowValues[y][x];
    };
    Board.prototype.isBombed = function () {
        for (var _i = 0, _a = this.displayRows; _i < _a.length; _i++) {
            var row = _a[_i];
            for (var _b = 0, row_1 = row; _b < row_1.length; _b++) {
                var cell = row_1[_b];
                if (cell == "B") {
                    return true;
                }
            }
        }
        return false;
    };
    Board.prototype.getNextEmpty = function () {
        for (var y = 0; y < this.displayRows.length; y++) {
            for (var x = 0; x < this.displayRows[y].length; x++) {
                if (this.displayRows[y][x] == "#")
                    return [x, y];
            }
        }
        throw new Error("Board is ful");
    };
    Board.prototype.render = function () {
        for (var _i = 0, _a = this.displayRows; _i < _a.length; _i++) {
            var row = _a[_i];
            console.log(row.join('|'));
        }
    };
    return Board;
}());
exports["default"] = Board;
