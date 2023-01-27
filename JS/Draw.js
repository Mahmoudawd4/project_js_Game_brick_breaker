// Game state
let game = {
    isLost:false,
    isStarted:false,
    isPaused:false,
    isWin:false,
    score:0,
    lives:3,
    requestId:null
}


function drawgame() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("lives: " + game.lives, canvas.width - 65, 20);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.Radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#ctx";
    ctx.fill();
}

//print screen 
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddle.width, paddle.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawBricks(lvl) {
    if (lvl == 1) {
        Level.one()
    } else if (lvl == 2) {
        Level.two()
    } else if (lvl == 3) {
        Level.three()
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!game.isStarted) {
        screenText.start();
    } else if (game.isLost) {
        screenText.lost();
    } else if (game.isWin) {
        screenText.win();
    } else if (game.isPaused) {
        screenText.pause();
    } else {
        drawBricks(curLevel);
        drawPaddle();
        drawBall();
        drawgame();
        update();
        checkWallsCollision();
        brickCollision();


        game.requestId = requestAnimationFrame(draw);
    }
}