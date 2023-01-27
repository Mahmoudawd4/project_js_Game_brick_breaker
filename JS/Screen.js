
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
