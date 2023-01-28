class Level {
    static one() {
        ball.Speed = 5;
        for (let c = 0; c < brick.columnCount; c++) {
            let brickX = 0, brickY = 0;
            for (let r = c; r < brick.rowCount / 2; r++) {
                if (bricks[c][r].health) {
                    bricks[c][r].status = 1;
                }else {
                    bricks[c][r].status = 0;
                }
                if (bricks[c][r].status) {
                    brickX = r * (brick.width + brick.padding) + brick.offSetLeft;
                    brickY = c * (brick.height + brick.padding) + brick.offSetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brick.width, brick.height);
                    ctx.fillStyle = colors[bricks[c][r].health];
                    ctx.fill();
                    ctx.closePath();
                }
                brickX = 0, brickY = 0;
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
                    let brickX = r * (brick.width + brick.padding) + brick.offSetLeft;
                    let brickY = c * (brick.height + brick.padding) + brick.offSetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brick.width, brick.height);
                    ctx.fillStyle = colors[c];
                    ctx.fill();
                    ctx.closePath();
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
                    let brickX = r * (brick.width + brick.padding) + brick.offSetLeft;
                    let brickY = c * (brick.height + brick.padding) + brick.offSetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brick.width, brick.height);
                    ctx.fillStyle = colors[c];
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
}