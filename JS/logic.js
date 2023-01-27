document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.addEventListener("mousemove", mouseMoveHandler);



function checkWallsCollision() {
    const hitLeftWall = () => (ball.x < 0);
    const hitRightWall = () => (ball.x + (ball.Radius * 2) > canvas.width);
    const hitTop = () => (ball.y < 0);
    const hitBottom = () => (ball.y + (ball.Radius * 2) > canvas.height);
    const hitPaddle = () => (ball.y + 2 * ball.Radius > canvas.height - paddle.height &&
        ball.y + ball.Radius < canvas.height &&
        ball.x + ball.Radius > paddleX &&
        ball.x + ball.Radius < paddleX + paddle.width);

    if (hitLeftWall()) {
        ball.dx = -ball.dx;
        ball.x = 0;
    } else if (hitRightWall()) {
        ball.dx = -ball.dx;
        ball.x = canvas.width - (ball.Radius * 2);
    } else if (hitTop()) {
        ball.dy = -ball.dy;
        ball.y = 0;
    }
    //  else if (hitPaddle()) {
    //     ball.dy = -ball.dy;
    //     ball.y = canvas.height - paddle.height - 2 * ball.Radius;
    // }
    else if (hitBottom()) {
        game.lives--;
        ballInit();
        game.isLost = game.lives === 0 ? true : false;
    }
    paddleCollisionBall();
}


function between(value, cond1, cond2) {
    if (value >= cond1 && value <= cond2) {
        return true;
    } else {
        return false;
    }
}

function paddleCollisionBall() {
    let yDir = (ball.y > paddleY) ? -1 : 1;
    let xDir = (ball.x > paddleX) ? -1 : 1;
    if (between(ball.y + (yDir * ball.Radius), paddleY, paddleY + paddle.height)
        && between(ball.x + (xDir * ball.Radius), paddleX, paddleX + paddle.width)
    ) {
        xMinOrPos = ball.x < (paddleX + paddle.width / 2) ? -1 : ball.x > (paddleX + paddle.width / 2) ? 1 : 0;
        xDirBall = ((paddleX + paddle.width / 2) / ball.x) / 2;
        if (xMinOrPos > 0) {
            ball.dx = (((xMinOrPos) * (ball.x - (paddle.width / 2 + paddleX)) / paddle.width)) * ball.Speed;
        } else {
            ball.dx = ((xMinOrPos) * Math.abs(((ball.x - paddleX) / paddle.width) - 1) + .5) * ball.Speed;
        }
        ball.dy *= -1;
    }
}

function brickCollision() {
    let ifStatZero = true;
    for (c = 0; c < brick.columnCount; c++) {
        for (r = 0; r < brick.rowCount; r++) {
            let b = bricks[c][r];
            if (b.status === 1) {
                ifStatZero = false;
                if (ball.x > b.x && ball.x < b.x + brick.width && ball.y > b.y && ball.y < b.y + brick.height) {
                    ball.dy = -ball.dy;
                    console.log(b.health);
                    if (b.health < 3){
                        b.health -= 1;
                        game.score++;
                    }
                    if(b.health < 1){
                        b.status = 0;
                    }
                    if (game.score === brick.rowCount * brick.columnCount * 1.5) {
                    //     localStorage.setItem("level", curLevel++);
                    //     alert('Congratulations!!');
                    //     document.location.reload();

                    isWin = true;
                    }
                }
            }
        }
    }
    
    if (ifStatZero === true) {
        localStorage.setItem("level", curLevel++);
        alert('Congratulations!!');
        document.location.reload();
    }
}


//init
let countLevels = 4;
let curLevel = parseInt(localStorage.getItem("level")) % countLevels || 1;


// key
let key = {
    rightKey: false,
    leftKey: false
}



function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddle.width / 2;
    }
}

function keyDownHandler(e) {
    if (e.key === 'ArrowRight') {
        key.rightKey = true;
    } else if (e.key === 'ArrowLeft') {
        key.leftKey = true;
    }
    // space button -- pause
    if (e.key === ' ') {
        if (game.isStarted && !game.isLost && !game.isWin) {
            game.isPaused = !game.isPaused;
            if (!game.isPaused) {
                play();
            }
        }
    }
}

function keyUpHandler(e) {
    if (e.key === 'ArrowRight') {
        key.rightKey = false;
    } else if (e.key === 'ArrowLeft') {
        key.leftKey = false;
    }
}


function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddle.width / 2;
    }
}

document.addEventListener("keydown", function (event) {
    if (event.code === "Enter" && (!game.isStarted || game.isLost || game.isWin)) {
        game.isStarted = true;
        game.isLost = false;
        game.isWin = false;
        game.score = 0;
        game.lives = 3;
        initBricks();
        for (let c = 0; c < brick.columnCount; c++) {
            for (let r = 0; r < brick.rowCount; r++) {
                bricks[c][r].status = 1;
            }
        }
        ballInit();
        play();
    }
});


function play() {
    cancelAnimationFrame(game.requestId);

    draw();
}

play();
