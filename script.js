const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.addEventListener("mousemove", mouseMoveHandler);



//init
let countLevels = 4; 
let curLevel = parseInt( localStorage.getItem("level")) % countLevels || 1;

// Paddle
let paddle = {
    height:10,
    width:150
}

let paddleX = (canvas.width - paddle.width) /2;
let paddleY = (canvas.height - paddle.height);

// The ball
let ball = {
    Radius:5,
    Speed:7,
}

// Ball initialization
function ballInit() {
    ball.x = paddleX;
    ball.y = paddleY;
    ball.dx = ball.Speed * (Math.random() * 2 - 1);  // Random trajectory
    ball.dy = -ball.Speed; // Up
}




// key
let key = {
    rightKey:false,
    leftKey:false
}


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



var bricks = [];

function initBricks() { 
    for (let c = 0; c < brick.columnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brick.rowCount; r++) {
            bricks[c][r] = {
                x : 0,
                y : 0,
                status : 1
            };
        }
    }
 }




//print screen 
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddle.width, paddle.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.Radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#ctx";
    ctx.fill();
}


function drawgame() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("lives: " + game.lives, canvas.width - 65, 20);
}


const screenText = {
    start() {
        ctx.font = "50px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Press Enter to Start game ", canvas.width / 2, canvas.height / 2);
    },
    lost() {
        ctx.font = "50px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    },
    pause() {
        ctx.font = "50px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Continue", canvas.width / 2, canvas.height / 2);
    },
};



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






function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddle.width / 2;
    }
}

// Ball Movement
function update() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  if (key.rightKey) {
    paddleX += ball.Speed;
    if (paddleX + paddle.width > canvas.width){
      paddleX = canvas.width - paddle.width;
    }
  }
  if (key.leftKey) {
    paddleX -= ball.Speed;
    if (paddleX < 0){
      paddleX = 0;
    }
  }
}

function checkWallsCollision() {
    const hitLeftWall = ()=>(ball.x < 0);
    const hitRightWall = ()=>(ball.x + (ball.Radius*2) > canvas.width);
    const hitTop = ()=>(ball.y < 0);
    const hitBottom = ()=>(ball.y + (ball.Radius*2) > canvas.height);
    const hitPaddle = () => (ball.y + 2 * ball.Radius > canvas.height - paddle.height &&
    ball.y + ball.Radius < canvas.height && 
    ball.x + ball.Radius > paddleX &&
    ball.x + ball.Radius < paddleX + paddle.width);

    if (hitLeftWall()) {
        ball.dx = -ball.dx;
        ball.x = 0;
    } else if (hitRightWall()) {
        ball.dx = -ball.dx;
        ball.x = canvas.width - (ball.Radius*2);
    } else if (hitTop()) {
        ball.dy = -ball.dy;
        ball.y = 0;
    } else if (hitPaddle()) {
        ball.dy = -ball.dy;
        ball.y = canvas.height - paddle.height - 2 * ball.Radius;
    } else if (hitBottom()) {
        game.lives--;
        ballInit();
        game.isLost = game.lives === 0 ? true : false;
    }
}





const colors = ['red', '#000080', 'yellow', 'blue', 'green','black','#000080'];

function drawBricks(lvl) {
    if (lvl == 1) {
        Level.one()
    } else if (lvl == 2) {
        Level.two()
    } else if (lvl == 3) {
        Level.three()
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
            if(!game.isPaused) {
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


function brickCollision(){
    for(c=0; c<brick.columnCount;c++){
        for(r=0; r<brick.rowCount; r++){
            let b = bricks[c][r];
            if(b.status === 1){
                if(ball.x > b.x && ball.x < b.x + brick.width && ball.y > b.y && ball.y < b.y + brick.height){
                    ball.dy = -ball.dy;
                    b.status = 0;
                    game.score++;
                    if (game.score === brick.rowCount*brick.columnCount){
                        localStorage.setItem("level", curLevel++);
                        alert('Congratulations!!');
                        document.location.reload();
                    }
                }
            }
        }
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

document.addEventListener("keydown", function (event) {
    if (event.code === "Enter" && (!game.isStarted || game.isLost || game.isWin)) {
        game.isStarted = true;
        game.isLost = false;
        game.isWin = false;
        game.score = 0;
        game.lives = 3 ;
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


class Level {
    static one() {
        ball.Speed = 5;
        for (let c = 0; c < brick.columnCount; c++) {
            let brickX = 0, brickY = 0;
            for (let r = c; r < brick.rowCount / 2; r++) {
                if (bricks[c][r].status) {
                    brickX = r * (brick.width + brick.padding) + brick.offSetLeft;
                    brickY = c * (brick.height + brick.padding) + brick.offSetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brick.width, brick.height);
                    ctx.fillStyle = colors[c];
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