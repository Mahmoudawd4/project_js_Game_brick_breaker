class Level {
    static one() {
        ball.Speed = 5;
        for (let c = 0; c < brick.columnCount; c++) {
            for (let r = c; r < brick.rowCount / 2; r++) {
                if (bricks[c][r].health) {
                    bricks[c][r].status = 1;
                }else {
                    bricks[c][r].status = 0;
                }
                if (bricks[c][r].status) {
                    drawBrick(bricks[c][r]);
                    drawBrickHealth(bricks[c][r]);
                }
            }
        }

    }

    static two() {
        ball.Speed = 8;
        for (let c = 0; c < brick.columnCount; c++) {
            for (let r = c; r < brick.rowCount / 2; r++) {
                bricks[c][r].status = 2;
            }
        }
        for (let c = 0; c < brick.columnCount; c++) {
            for (let r = 0; r < brick.rowCount; r++) {
                if (bricks[c][r].health) {
                    bricks[c][r].status = 1;
                }else {
                    bricks[c][r].status = 0;
                }
                if (bricks[c][r].status === 1) {
                    drawBrick(bricks[c][r]);
                    drawBrickHealth(bricks[c][r]);
                }
            }
        }
    }

    static three() {
        ball.Speed = 7;
        for (let c = 0; c < brick.columnCount; c++) {
            for (let r = 0; r < brick.rowCount; r++) {
                if (bricks[c][r].health) {
                    bricks[c][r].status = 1;
                }else {
                    bricks[c][r].status = 0;
                }
                if (bricks[c][r].status === 1) {
                    drawBrick(bricks[c][r]);
                    drawBrickHealth(bricks[c][r]);
                }
            }
        }
    }
}

function drawBrick(b) {
    const brickColorStart = () => (b.health < 3? "#ffad00": colors[b.health]);
    const brickColorEnd = () => (b.health < 3? colors[b.health]: "white");

    ctx.beginPath();
    // color
    var my_gradient = ctx.createLinearGradient(b.x, b.y, b.x+brick.width+20, b.y+brick.height+20);
    my_gradient.addColorStop(0, brickColorStart());
    my_gradient.addColorStop(1, brickColorEnd());
    ctx.fillStyle = my_gradient;
    // rect
    ctx.rect(b.x, b.y, brick.width, brick.height);
    ctx.fill();
    ctx.closePath();
}


function drawBrickHealth(b) {
    const brickCenterX = () => (b.x + brick.width/2);
    const brickCenterY = () => (b.y + brick.height/2);
    const countCircleRadius = () => (brick.height/3);
    if (b.health < 3){
        // circle
        ctx.beginPath();
        ctx.arc(brickCenterX(), brickCenterY(), countCircleRadius(), 0, 2 * Math.PI);
        ctx.fillStyle = "#eee";
        ctx.fill();

        // count
        ctx.font = "10px Arial";
        ctx.fillStyle = "#000";
        ctx.textBaseline = 'middle';
        ctx.textAlign = "center";
        ctx.fillText(b.health, brickCenterX(), brickCenterY());
    }
}
