let textColor = "black";
const screenText = {
    start() {
        ctx.font = "50px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Press Enter to Start game ", canvas.width / 2, canvas.height / 2);
    },
    menu() {
        ctx.font = "50px Arial";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.fillText("Click on Level and Press enter", canvas.width / 2, 60);
        ctx.fillText("Easy", canvas.width / 2, 200);
        ctx.fillText("medium", canvas.width / 2, 300);
        ctx.fillText("hard", canvas.width / 2, 400);
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

canvas.onclick = function(e){
    if(e.offsetX >= (canvas.width / 2)- 100 && e.offsetX <= (canvas.width / 2) + 100){
        if(e.offsetY >= 150 && e.offsetY <= 225){
            curLevel = 1;
        }else if(e.offsetY >= 250 && e.offsetY <= 325){
            curLevel = 2;
        }else if(e.offsetY >= 350 && e.offsetY <= 425){
            curLevel = 3;
        }else{
            canvas.style.cursor = "initial";
        }


    }
}

canvas.onmousemove = function(e){
    if(e.offsetX >= (canvas.width / 2)- 100 && e.offsetX <= (canvas.width / 2) + 100){
        if(e.offsetY >= 150 && e.offsetY <= 225){
            canvas.style.cursor = "pointer";
            textColor = "red";
        }else if(e.offsetY >= 250 && e.offsetY <= 325){
            canvas.style.cursor = "pointer";
            textColor = "red";
        }else if(e.offsetY >= 350 && e.offsetY <= 425){
            canvas.style.cursor = "pointer";
            textColor = "red";
        }else{
            canvas.style.cursor = "initial";
            textColor = "black";
        }
    }else{
        canvas.style.cursor = "initial";
        textColor = "black";
    }
}