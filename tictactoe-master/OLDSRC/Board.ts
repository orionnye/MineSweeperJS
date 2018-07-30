
export type Token = "B" | number
export type Cell = string | Token //I wanted to assign only "#" and Token

export default class Board {
    //Board Properties
    rowValues: Cell[][] = []
    displayRows: Cell[][] = []

    constructor(width: number, height: number, bombCount: number) {
        //Pushes the empty values base for the Board
        for (let h = 0; h < height; h++) {
            let row = []
            let displayRow = []
            for (let w = 0; w < width; w++) {
                row.push(0)
                displayRow.push("#")
            }
            this.rowValues.push(row)
            this.displayRows.push(displayRow)
        }
        //Pushes random Bombs onto the grid
        for (let b = 0; b < bombCount; b++) {
            let mineX = Math.floor(Math.random() * width) 
            let mineY = Math.floor(Math.random() * height)
            this.rowValues[mineY][mineX] = "B"
        }
        //Counts surrounding Bombs and reassigns value
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let bombDanger = 0
                //up
                if (y > 0 && this.rowValues[y - 1][x] == "B")
                    bombDanger += 1
                //down
                if (y < height - 1 && this.rowValues[y + 1][x] == "B")
                    bombDanger += 1
                //left
                if (x > 0 && this.rowValues[y][x - 1] == "B")
                    bombDanger += 1
                //right
                if (x < width - 1 && this.rowValues[y][x + 1] == "B")
                    bombDanger += 1
                //upper
                if (y > 0) {
                    //left
                    if (x > 0 && this.rowValues[y - 1][x - 1] == "B")
                        bombDanger += 1
                    //right
                    if (x < width - 1 && this.rowValues[y - 1][x + 1] == "B")
                        bombDanger += 1
                }
                //lower
                if (y < height - 1) {
                    //left
                    if (x > 0 && this.rowValues[y + 1][x -1] == "B")
                        bombDanger += 1
                    //right
                    if (x < width && this.rowValues[y + 1][x + 1] == "B")
                        bombDanger += 1
                }

                if (this.rowValues[y][x] != "B"){
                    this.rowValues[y][x] = bombDanger
                }
            }
        }

    }
    move(x: number, y: number) {
        this.displayRows[y][x] = this.rowValues[y][x]
    }

    isBombed() {
        for (let row of this.displayRows) {
            for (let cell of row) {
                if (cell == "B") {
                    return true
                }
            }
        }
        return false
    }

    getNextEmpty() {
        for (let y = 0; y < this.displayRows.length; y++) {
            for (let x = 0; x < this.displayRows[y].length; x++) {
                if (this.displayRows[y][x] == "#")
                    return [x,y]
            }
        }
        throw new Error("Board is full")
    }

    render() {
        for (let row of this.displayRows) {
            console.log(row.join('|'))
        }
    }
}