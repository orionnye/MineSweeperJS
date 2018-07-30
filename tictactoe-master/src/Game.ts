declare var require: any
var readlineSync = require('readline-sync')

import Board, {Token} from "./Board"
import * as ai from "./AI"

let board = new Board(10, 10, 10)

// let aiToken: Token = "O"

while (!board.isBombed()) {
    board.render()
    console.log('Enter zero based move: column, row')
    let value = readlineSync.question("")
    let values = value.split(/[ ,]/g)
    let x = parseInt(values[0])
    let y = parseInt(values[1])
    board.move(x, y)
}

console.log('game over')
board.render()


