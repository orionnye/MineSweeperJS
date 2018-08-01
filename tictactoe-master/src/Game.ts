declare var require: any
var readlineSync = require('readline-sync')

import Board, {Token} from "./Board"

let board = new Board(10, 10)
board.placeMines(10)

while (!board.isBombed()) {
    board.render()
    console.log('Enter zero based move: column, row')
    let value = readlineSync.question("")
    let values = value.split(/[ ,]/g)
    let x = parseInt(values[0])
    let y = parseInt(values[1])
    board.getCell(x, y).revealed = true
    board.infectZeroes()
}

console.log('KAABOOM!...game over')
board.render()