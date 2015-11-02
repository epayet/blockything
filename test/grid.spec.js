import chai from 'chai';
var should = chai.should();
var expect = chai.expect;

import {Block, BlockGrid} from '../app/javascript/grid';

describe("hide", () => {
    it("should clear everything", () => {
        var colour = 'white';
        var grid = [
            [new Block(0, 0, colour), new Block(0, 1, colour), new Block(0, 2, colour)],
            [new Block(1, 0, colour), new Block(1, 1, colour), new Block(1, 2, colour)],
            [new Block(2, 0, colour), new Block(2, 1, colour), new Block(2, 2, colour)]
        ];
        var simpleBlockGrid = new BlockGrid(grid);
        simpleBlockGrid.hide(grid[1][1]);

        for(let x=0; x<grid.length; x++) {
            for(let y=0; y<grid[x].length; y++) {
                expect(grid[x][y].isHidden()).to.be.true;
            }
        }
    });

    it("should clear strict neighbours", () => {
        let colour = 'black';
        var grid = [
            [new Block(0, 0, 'white'), new Block(0, 1, 'black')],
            [new Block(1, 0, 'black'), new Block(1, 1, 'white')],
        ];
        var simpleBlockGrid = new BlockGrid(grid);
        simpleBlockGrid.hide(grid[0][0]);

        expect(grid[0][0].isHidden()).to.be.true;
        expect(grid[0][1].isHidden()).to.be.false;
        expect(grid[1][0].isHidden()).to.be.false;
        expect(grid[1][1].isHidden()).to.be.false;
    });
});

describe("putHiddenAtTop", () => {
    it("should put the white one at the top, one hidden", () => {
        let grid = [
            [new Block(0, 0, 'white', true), new Block(0, 1, 'black'), new Block(0, 2, 'black')]
        ];
        let blockGrid = new BlockGrid(grid);
        blockGrid.putHiddenAtTop();

        expect(grid[0][0].colour).to.equal('black');
        expect(grid[0][1].colour).to.equal('black');
        expect(grid[0][2].colour).to.equal('white');
        expect(grid[0][2].isHidden()).to.be.true;
        expect(grid[0][2].y).to.be.equal(2);
    });

    it("should put middle at the end", () => {
        let grid = [
            [new Block(0, 0, 'white'), new Block(0, 1, 'black', true), new Block(0, 2, 'black', true), new Block(0, 3, 'white')]
        ];
        let blockGrid = new BlockGrid(grid);
        blockGrid.putHiddenAtTop();

        expect(grid[0][0].isHidden()).to.be.false;
        expect(grid[0][1].isHidden()).to.be.false;
        expect(grid[0][2].isHidden()).to.be.true;
        expect(grid[0][3].isHidden()).to.be.true;
    });
});

describe("swapBlocks", () => {
    it("should swap blocks and their positions", () => {
        let grid = [
            [new Block(0, 0, 'white'), new Block(0, 1, 'black')]
        ];
        let blockGrid = new BlockGrid(grid);

        blockGrid.swapBlocks(grid[0][0], grid[0][1]);

        expect(grid[0][0].colour).to.be.equal('black');
        expect(grid[0][0].x).to.be.equal(0);
        expect(grid[0][0].y).to.be.equal(0);

        expect(grid[0][1].colour).to.be.equal('white');
        expect(grid[0][1].x).to.be.equal(0);
        expect(grid[0][1].y).to.be.equal(1);
    });
});