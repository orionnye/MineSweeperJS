"use strict";
exports.__esModule = true;
function move(board, token) {
    var _a = board.getNextEmpty(), x = _a[0], y = _a[1];
    board.move(x, y);
}
exports.move = move;
