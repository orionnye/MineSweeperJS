import Board, {Token} from "./Board"

export function move(board: Board, token: Token) {
    let [x, y] = board.getNextEmpty()
    board.move(x, y)
}
