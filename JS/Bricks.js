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


var bricks = [];

function initBricks() { 
    for (let c = 0; c < brick.columnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brick.rowCount; r++) {
            let curHeal = 2;
            let randHealth = Math.ceil(Math.random() * 10);
            if(randHealth > 2 && randHealth < 5){
                curHeal = 3;
            }
            bricks[c][r] = {
                x : r * (brick.width + brick.padding) + brick.offSetLeft,
                y : c * (brick.height + brick.padding) + brick.offSetTop,
                status : 0,
                health: curHeal
            };
        }
    }
 }

 