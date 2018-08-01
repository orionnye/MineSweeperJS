
export type Token = "B" | number
export type Cell = string | Token //I wanted to assign only "#" and Token

export type MineCell = { bomb: any, revealed: boolean}

export default class Board {
    //Board Properties
    rows: MineCell[][] = []
    width: number
    height: number
    constructor(width: number, height: number) {
        this.width = width
        this.height = height
        for (let y = 0; y < height; y++) {
            let row = []
            for (let x = 0; x < width; x++) {
                row.push({ bomb: false, revealed: false })
            }
            this.rows.push(row)
        }
    }

    getCell(x: number , y: number): MineCell {
        if (y >= 0 && y < this.height) {
            if (x >= 0 && x < this.width) {
                return this.rows[y][x]
            }
        }
        return {bomb: false, revealed: false}
    }

    placeMines(bombCount: number) {
        for (let b = 0; b < bombCount; b++){
            let mineX = Math.floor(Math.random() * this.width)
            let mineY = Math.floor(Math.random() * this.height)
            this.rows[mineY][mineX].bomb = true
        }
    }

    countBombNeighbours(x: number, y: number): number {
        let bombDanger =
            //up and down
            this.getCell(x, y-1).bomb + this.getCell(x, y+1).bomb
            //left and right
            + this.getCell(x-1, y).bomb + this.getCell(x+1, y).bomb
            //top left and bottom right
            + this.getCell(x-1, y-1).bomb + this.getCell(x+1, y+1).bomb
            //top right and bottom left
            + this.getCell(x+1, y-1).bomb + this.getCell(x-1, y+1).bomb
        return bombDanger
    }

    isRevealedZero(x: number, y: number): Boolean {
        return this.getCell(x, y).revealed && this.countBombNeighbours(x, y) == 0
    }

    isNeighborZero(x: number, y: number): Boolean {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (j != 0 || i != 0) {
                    if (this.isRevealedZero(x+j, y+i)) {
                        return true
                    }
                }
            }
        }
        return false
    }

    infectZeroes() {
        let count
        do {
            count = 0
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    if(!this.getCell(x, y).revealed) {
                        if (this.isNeighborZero(x, y)) {
                            this.getCell(x, y).revealed = true
                            count += 1
                        }
                    }
                }
            }
        }
        while (count > 0);
    }

    isBombed() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.rows[y][x].bomb && this.rows[y][x].revealed) {
                    return true
                }
            }
        }
        return false
    }
    render() {
        let returnString = []
        
        for (let y = 0; y < this.height; y++) {
            let row = []
            for (let x = 0; x < this.width; x++) {
                //return bomb if that
                if (this.rows[y][x].revealed){
                    if (this.rows[y][x].bomb) {
                        row.push("B")
                    }
                    else
                        row.push(this.countBombNeighbours(x, y))
                }
                else
                    row.push("_")
            }
            returnString.push(row.join("|"))
        }
        console.log(returnString.join("\n"))
    }
}