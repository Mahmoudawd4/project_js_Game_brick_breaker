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
                    ctx.beginPath();
                    ctx.rect(bricks[c][r].x, bricks[c][r].y, brick.width, brick.height);
                    ctx.fillStyle = colors[bricks[c][r].health];
                    ctx.fill();
                    ctx.closePath();
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
                    ctx.beginPath();
                    ctx.rect(bricks[c][r].x, bricks[c][r].y, brick.width, brick.height);
                    ctx.fillStyle = colors[c];
                    ctx.fill();
                    ctx.closePath();
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
                    ctx.beginPath();
                    ctx.rect(bricks[c][r].x, bricks[c][r].y, brick.width, brick.height);
                    ctx.fillStyle = colors[c];
                    ctx.fill();
                    ctx.closePath();
                    drawBrickHealth(bricks[c][r]);
                }
            }
        }
    }
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
