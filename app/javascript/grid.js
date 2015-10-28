/*jslint browser: true*/
/*global  */


const COLOURS = ['white', 'black'];
//const COLOURS = ['red', 'green', 'blue', 'yellow'];
const MAX_X = 10;
const MAX_Y = 10;

class Block {
    constructor (x, y, colour=COLOURS[Math.floor(Math.random() * COLOURS.length)]) {
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.hidden = false;
    }

    isHidden() {
        return this.hidden;
    }
}

class BlockGrid {
    constructor (grid=[]) {
        this.grid = grid;
        if(grid.length > 0) {
            this.maxX = grid.length;
            this.maxY = grid[0].length;
        } else {
            this.maxX = MAX_X;
            this.maxY = MAX_Y;
        }

        if(grid.length == 0) {
            for (let x = 0; x < this.maxX; x++) {
                let col = [];
                for (let y = 0; y < this.maxY; y++) {
                    col.push(new Block(x, y));
                }

                this.grid.push(col);
            }
        }

        return this;
    }

    render (el = document.querySelector('#gridEl')) {
        for (let x = 0; x < this.maxX; x++) {
            let id = 'col_' + x;
            let colEl = document.createElement('div');
            colEl.className = 'col';
            colEl.id = id;
            if(el) {
                el.appendChild(colEl);
            }

            for (let y = this.maxY - 1; y >= 0; y--) {
                let block = this.grid[x][y],
                    id = `block_${x}x${y}`,
                    blockEl = document.createElement('div');

                blockEl.id = id;
                blockEl.className = 'block';
                blockEl.style.background = block.colour;
                blockEl.addEventListener('click', (evt) => this.blockClicked(evt, block));
                colEl.appendChild(blockEl);
            }
        }

        return this;
    }

    blockClicked (e, block) {
        console.log(e, block);
    }
}

export {Block, BlockGrid}