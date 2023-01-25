const canvas = document.getElementById("myCanvas");



const ctx = canvas.getContext("2d");



// Paddle
const paddleHeight = 10;
const paddleWidth = 150;
let paddleX = (canvas.width - paddleWidth) /2;
let paddleY = (canvas.height - paddleHeight);

// The ball
let ballRadius = 5;
let ballX = canvas.width / 2;
let ballY = canvas.height - paddleHeight - ballRadius;
let ballSpeed = 7;
let dx = ballSpeed * (Math.random() * 2 - 1);  // Random trajectory
let dy = -ballSpeed; // Up

// Ball initialization
function ballInit() {
    ballRadius = 5;
    ballX = paddleX;
    ballY = paddleY;
    ballSpeed = 7;
    dx = ballSpeed * (Math.random() * 2 - 1);  // Random trajectory
    dy = -ballSpeed; // Up
}



// Keyboard state
let rightPressed = false;
let leftPressed = false;




// Bricks info var
const brickRowCount = 16;
const brickColumnCount = 10;
const brickWidth = 50;
const brickHeight = 20;
const brickPadding = 2;
const brickOffsetTop = 2;
const brickOffsetLeft = 70;




var bricks = [];

for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {
            x : 0,
            y : 0,
            status : 1
        };
    }
}


//print screen 
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#ctx";
    ctx.fill();
}


function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#008080";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
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
let isLost = false;
let isStarted = false;
let isPaused = false;
let isWin = false;
let score = 0;
let lives = 3;
let requestId;


document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.addEventListener("mousemove", mouseMoveHandler);



function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

// Ball Movement
function update() {
  ballX += dx;
  ballY += dy;
  if (rightPressed) {
    paddleX += ballSpeed;
    if (paddleX + paddleWidth > canvas.width){
      paddleX = canvas.width - paddleWidth;
    }
  }
  if (leftPressed) {
    paddleX -= ballSpeed;
    if (paddleX < 0){
      paddleX = 0;
    }
  }
}

function checkWallsCollision() {
    const hitLeftWall = ()=>(ballX < 0);
    const hitRightWall = ()=>(ballX + (ballRadius*2) > canvas.width);
    const hitTop = ()=>(ballY < 0);
    const hitBottom = ()=>(ballY + (ballRadius*2) > canvas.height);
    const hitPaddle = () => (ballY + 2 * ballRadius > canvas.height - paddleHeight &&
    ballY + ballRadius < canvas.height && 
    ballX + ballRadius > paddleX &&
    ballX + ballRadius < paddleX + paddleWidth);

    if (hitLeftWall()) {
        dx = -dx;
        ballX = 0;
    } else if (hitRightWall()) {
        dx = -dx;
        ballX = canvas.width - (ballRadius*2);
    } else if (hitTop()) {
        dy = -dy;
        ballY = 0;
    } else if (hitPaddle()) {
        dy = -dy;
        ballY = canvas.height - paddleHeight - 2 * ballRadius;
    } else if (hitBottom()) {
        lives--;
        ballInit();
        isLost = lives === 0 ? true : false;
    } 
}





const colors = ['red', '#000080', 'yellow', 'blue', 'green','black','#000080'];

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
                let brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle =colors[c];
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function keyDownHandler(e) {
    if (e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'ArrowLeft') {
        leftPressed = true;
    }
    // space button -- pause
    if (e.key === ' ') {
        if (isStarted && !isLost && !isWin) {
            isPaused = !isPaused;
            if(!isPaused) {
                play();
            }
        }
    }
}

function keyUpHandler(e) {
    if (e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}


function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}


function brickCollision(){
    for(c=0; c<brickColumnCount;c++){
        for(r=0; r<brickRowCount; r++){
            let b = bricks[c][r];
            if(b.status === 1){
                if(ballX > b.x && ballX < b.x + brickWidth && ballY > b.y && ballY < b.y + brickHeight){
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score === brickRowCount*brickColumnCount){
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
    if (!isStarted) {
        screenText.start();
    } else if (isLost) {
        screenText.lost();
    } else if (isWin) {
        screenText.win();
    } else if (isPaused) {
        screenText.pause();
    } else {
        drawBricks();
        drawPaddle();
        drawBall();
        drawLives();
        update();
        checkWallsCollision();
        brickCollision();


        requestId = requestAnimationFrame(draw);
    }
}

document.addEventListener("keydown", function (event) {
    if (event.code === "Enter" && (!isStarted || isLost || isWin)) {
        isStarted = true;
        isLost = false;
        isWin = false;
        score = 0;
        lives = 3;
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                bricks[c][r].status = 1;
            }
        }
        ballInit();
        play();
    }
});


function play() {
  cancelAnimationFrame(requestId);
  
  draw();
}

play();
