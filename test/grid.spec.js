import chai from 'chai';
var should = chai.should();
var expect = chai.expect;

import {Block, BlockGrid} from '../app/javascript/grid';

describe("blockClicked", () => {
    it("should clear everything", () => {
        var colour = 'black';
        var grid = [
            [new Block(0, 0, colour), new Block(0, 1, colour), new Block(0, 2, colour)],
            [new Block(1, 0, colour), new Block(1, 1, colour), new Block(1, 2, colour)],
            [new Block(2, 0, colour), new Block(2, 1, colour), new Block(2, 2, colour)]
        ];
        var simpleBlockGrid = new BlockGrid(3, 3, grid);
        simpleBlockGrid.blockClicked({}, new Block(1, 1, 'white'));

        for(let x=0; x<grid.length; x++) {
            for(let y=0; y<grid[x].length; y++) {
                expect(grid[x][y].isHidden()).to.be.true;
            }
        }
    });
});