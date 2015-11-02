/*jslint browser: true*/
/*global  */


//const COLOURS = ['white', 'black'];
const COLOURS = ['red', 'green', 'blue', 'yellow'];
const MAX_X = 10;
const MAX_Y = 10;
const EMPTY_BLOCK_COLOUR = 'grey';

export class Block {
    constructor (x, y, colour=COLOURS[Math.floor(Math.random() * COLOURS.length)], hidden=false) {
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.hidden = hidden;
    }

    hide() {
        this.hidden = true;
    }

    isHidden() {
        return this.hidden;
    }
}

export class BlockGrid {
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
                blockEl.style.background = block.isHidden() ? EMPTY_BLOCK_COLOUR : block.colour;
                blockEl.addEventListener('click', (evt) => this.blockClicked(evt, block));
                colEl.appendChild(blockEl);
            }
        }

        return this;
    }

    clear(el = document.querySelector('#gridEl')) {
        el.innerHTML = "";
    }

    blockClicked (e, block) {
        console.log(block);
        this.hide(block);
        this.putHiddenAtTop();
        this.clear();
        this.render();
    }

    hide(block) {
        block.hide();
        let neighbours = [
            {x: block.x, y: block.y + 1},  // top
            {x: block.x - 1, y: block.y},  // left
            {x: block.x + 1, y: block.y},  // right
            {x: block.x, y: block.y - 1}  // bottom
        ];
        neighbours.forEach(neighbour => {
            if(neighbour.x >= 0 && neighbour.x < this.maxX && neighbour.y >= 0 && neighbour.y < this.maxY) {
                let neighbourBlock = this.grid[neighbour.x][neighbour.y];
                if(!neighbourBlock.isHidden() && neighbourBlock.colour == block.colour) {
                    this.hide(neighbourBlock);
                }
            }
        });
    }

    putHiddenAtTop() {
        for(let x=0; x <this.maxX; x++) {
            for(let y=0; y<this.maxY; y++) {
                if(this.grid[x][y].isHidden()) {
                    // find the next not hidden block
                    for(let nextY=y+1; nextY<this.maxY; nextY++) {
                        if(this.grid[x][nextY].isHidden()) {
                            continue;
                        }
                        this.swapBlocks(this.grid[x][y], this.grid[x][nextY]);
                        break;
                    }
                }
            }
        }
    }

    swapBlocks(block1, block2) {
        this.grid[block2.x][block2.y] = block1;
        this.grid[block1.x][block1.y] = block2;

        let tmpX = block1.x;
        let tmpY = block1.y;

        block1.x = block2.x;
        block1.y = block2.y;

        block2.x = tmpX;
        block2.y = tmpY;
    }
}