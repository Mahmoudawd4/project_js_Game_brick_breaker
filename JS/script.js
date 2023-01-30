const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let image = {
background:new Image(),
body:new Image()
}
image.background.src='/project_js_Game_brick_breaker/imgs/bricks_1920x1280.jpg';
image.body.src = '/project_js_Game_brick_breaker/imgs/stream.png'

const loseSound = document.getElementById("loseSound");
const hitSound = document.getElementById("hitSound");
const winSound = document.getElementById("winSound");
const loseLive = document.getElementById("loseLive");