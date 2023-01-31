//Brick
let brick = {
    rowCount:16,
    columnCount:10,
    width:50,
    height:20,
    padding:2,
    offSetTop:2,
    offSetLeft:70
}

const colors = ['red', '#000080', 'yellow', 'blue', 'green','black','#000080'];

var Levels = [
    ['OOOOOUOOOOOOOOOO',
     'OOOOOOOOOOOOOOOO',
     'OOOOO1OOOOOOOOOO',
     'OOOOO1222UOOOOOO',
     'OOOOO1O2O1OOOOOO',
     'OOOOO1O2O1OOOOOO',
     'OOOOO1O2O1OOOOOO',
     'OOOOO1O2O1OOOOOO',
     'OOOOOOO2O1OOOOOO',
     'OOOOOOOOO1OOOOOO'],

    ['OOOOO11OO11OOOOO',
     'OOOO22222222OOOO',
     'OOO12OO22OO21OOO',
     'OOO12OO22OO21OOO',
     'OOO12OO22OO21OOO',
     'OOOO12222221OOOO',
     'OOOOO111111OOOOO',
     'OOOOO111111OOOOO',
     'OOOOOO1UU1OOOOOO',
     'OOOOOOO11OOOOOOO'],

    ['O21111111111112O',
     'OO211111111112OO',
     'OO121111111121OO',
     'OOO121U11U121OOO',
     'OOOO12122121OOOO',
     'OOOOO121121OOOOO',
     'OOOOOO1221OOOOOO',
     'OOOOOOO11OOOOOOO',
     'OOOOOOOOOOOOOOOO',
     'OOOOOOOUUOOOOOOO'],
];


var bricks = [];

function initBricks() { 
  let level = Levels[curLevel-1];
  for (let c = 0; c < brick.columnCount; c++) {
      bricks[c] = [];
      var rowColumns = level[c];
      for (let r = 0; r < brick.rowCount; r++) {
          if (rowColumns.charAt(r) ==='1') {
            bricks[c][r] = {
              x : r * (brick.width + brick.padding) + brick.offSetLeft,
              y : c * (brick.height + brick.padding) + brick.offSetTop,
              status : 1,
              health: 1
            };
          }
          if (rowColumns.charAt(r) === 'O') {
            bricks[c][r] = {
              x : r * (brick.width + brick.padding) + brick.offSetLeft,
              y : c * (brick.height + brick.padding) + brick.offSetTop,
              status : 0,
              health: 0
            };
          }
          if (rowColumns.charAt(r) === 'U'){
             bricks[c][r] = {
              x : r * (brick.width + brick.padding) + brick.offSetLeft,
              y : c * (brick.height + brick.padding) + brick.offSetTop,
              status : 1,
              health: 3
            };
          }
          if (rowColumns.charAt(r) === '2'){
             bricks[c][r] = {
              x : r * (brick.width + brick.padding) + brick.offSetLeft,
              y : c * (brick.height + brick.padding) + brick.offSetTop,
              status : 1,
              health: 2
            };
          }
      }
  }
}
