// The ball
let ball = {
    Radius:5,
    Speed:7,
}

// Ball initialization
function ballInit() {
    ball.x = paddleX + (paddle.width/2);
    ball.y = paddleY - (ball.Radius*2);
    ball.dx = ball.Speed * (Math.random() * 2 - 1);  // Random trajectory
    ball.dy = -ball.Speed; // Up
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