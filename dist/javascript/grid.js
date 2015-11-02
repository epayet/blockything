var $__grid_46_js__ = (function() {
  "use strict";
  var __moduleName = "grid.js";
  var COLOURS = ['red', 'green', 'blue', 'yellow'];
  var MAX_X = 10;
  var MAX_Y = 10;
  var EMPTY_BLOCK_COLOUR = 'grey';
  var Block = function() {
    function Block(x, y) {
      var colour = arguments[2] !== (void 0) ? arguments[2] : COLOURS[Math.floor(Math.random() * COLOURS.length)];
      var hidden = arguments[3] !== (void 0) ? arguments[3] : false;
      this.x = x;
      this.y = y;
      this.colour = colour;
      this.hidden = hidden;
    }
    return ($traceurRuntime.createClass)(Block, {
      hide: function() {
        this.hidden = true;
      },
      isHidden: function() {
        return this.hidden;
      }
    }, {});
  }();
  var BlockGrid = function() {
    function BlockGrid() {
      var grid = arguments[0] !== (void 0) ? arguments[0] : [];
      this.grid = grid;
      if (grid.length > 0) {
        this.maxX = grid.length;
        this.maxY = grid[0].length;
      } else {
        this.maxX = MAX_X;
        this.maxY = MAX_Y;
      }
      if (grid.length == 0) {
        for (var x = 0; x < this.maxX; x++) {
          var col = [];
          for (var y = 0; y < this.maxY; y++) {
            col.push(new Block(x, y));
          }
          this.grid.push(col);
        }
      }
      return this;
    }
    return ($traceurRuntime.createClass)(BlockGrid, {
      render: function() {
        var el = arguments[0] !== (void 0) ? arguments[0] : document.querySelector('#gridEl');
        var $__3 = this;
        for (var x = 0; x < this.maxX; x++) {
          var id = 'col_' + x;
          var colEl = document.createElement('div');
          colEl.className = 'col';
          colEl.id = id;
          if (el) {
            el.appendChild(colEl);
          }
          var $__4 = this,
              $__5 = function(y) {
                var block = $__4.grid[x][y],
                    id = ("block_" + x + "x" + y),
                    blockEl = document.createElement('div');
                blockEl.id = id;
                blockEl.className = 'block';
                blockEl.style.background = block.isHidden() ? EMPTY_BLOCK_COLOUR : block.colour;
                blockEl.addEventListener('click', function(evt) {
                  return $__3.blockClicked(evt, block);
                });
                colEl.appendChild(blockEl);
              };
          for (var y = this.maxY - 1; y >= 0; y--) {
            $__5(y);
          }
        }
        return this;
      },
      clear: function() {
        var el = arguments[0] !== (void 0) ? arguments[0] : document.querySelector('#gridEl');
        el.innerHTML = "";
      },
      blockClicked: function(e, block) {
        console.log(block);
        this.hide(block);
        this.putHiddenAtTop();
        this.clear();
        this.render();
      },
      hide: function(block) {
        var $__3 = this;
        block.hide();
        var neighbours = [{
          x: block.x,
          y: block.y + 1
        }, {
          x: block.x - 1,
          y: block.y
        }, {
          x: block.x + 1,
          y: block.y
        }, {
          x: block.x,
          y: block.y - 1
        }];
        neighbours.forEach(function(neighbour) {
          if (neighbour.x >= 0 && neighbour.x < $__3.maxX && neighbour.y >= 0 && neighbour.y < $__3.maxY) {
            var neighbourBlock = $__3.grid[neighbour.x][neighbour.y];
            if (!neighbourBlock.isHidden() && neighbourBlock.colour == block.colour) {
              $__3.hide(neighbourBlock);
            }
          }
        });
      },
      putHiddenAtTop: function() {
        for (var x = 0; x < this.maxX; x++) {
          for (var y = 0; y < this.maxY; y++) {
            if (this.grid[x][y].isHidden()) {
              for (var nextY = y + 1; nextY < this.maxY; nextY++) {
                if (this.grid[x][nextY].isHidden()) {
                  continue;
                }
                this.swapBlocks(this.grid[x][y], this.grid[x][nextY]);
                break;
              }
            }
          }
        }
      },
      swapBlocks: function(block1, block2) {
        this.grid[block2.x][block2.y] = block1;
        this.grid[block1.x][block1.y] = block2;
        var tmpX = block1.x;
        var tmpY = block1.y;
        block1.x = block2.x;
        block1.y = block2.y;
        block2.x = tmpX;
        block2.y = tmpY;
      }
    }, {});
  }();
  return {
    get Block() {
      return Block;
    },
    get BlockGrid() {
      return BlockGrid;
    }
  };
})();
