let easyLvlColor = "black";
let mediumLvlColor = "black";
let hardLvlColor = "black";

const screenText = {
    clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    start() {
        ctx.font = "50px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Press Enter to Start game ", canvas.width / 2, canvas.height / 2);
    },
    menu() {
        ctx.font = "50px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Click on Level and Press enter", canvas.width / 2, 60);
        ctx.fillStyle = easyLvlColor;
        ctx.fillText("Easy", canvas.width / 2, 200);
        ctx.fillStyle = mediumLvlColor;
        ctx.fillText("medium", canvas.width / 2, 300);
        ctx.fillStyle = hardLvlColor;
        ctx.fillText("hard", canvas.width / 2, 400);
    },
    lost() {
        ctx.font = "50px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    },

    win() {
        ctx.font = "50px Arial";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("Congratulations! You did it!", canvas.width / 2, canvas.height / 2);
    },
    pause() {
        ctx.font = "50px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Continue", canvas.width / 2, canvas.height / 2);
    },
};

canvas.onclick = function(e){
    if (!game.isStarted) {
        const MiddleX = () => e.offsetX >= (canvas.width / 2)- 100 && e.offsetX <= (canvas.width / 2) + 100;
        const EasyY = () => e.offsetY >= 150 && e.offsetY <= 225;
        const MediumY = () => e.offsetY >= 250 && e.offsetY <= 325;
        const HardY = () => e.offsetY >= 350 && e.offsetY <= 425;

        if(MiddleX()){
            if(EasyY()){
                curLevel = 1;
            }else if(MediumY()){
                curLevel = 2;
            }else if(HardY()){
                curLevel = 3;
            }
        }
    }
}


let changed = 0;
canvas.onmousemove = function(e){
    if (!game.isStarted) {
        const MiddleX = () => e.offsetX >= (canvas.width / 2)- 100 && e.offsetX <= (canvas.width / 2) + 100;
        const EasyY = () => e.offsetY >= 150 && e.offsetY <= 225;
        const MediumY = () => e.offsetY >= 250 && e.offsetY <= 325;
        const HardY = () => e.offsetY >= 350 && e.offsetY <= 425;

        if(MiddleX()){
            if(EasyY()){
                canvas.style.cursor = "pointer";
                easyLvlColor = "red";
                changed = 1;
                screenText.clear();
                screenText.menu();
            }else if(MediumY()){
                canvas.style.cursor = "pointer";
                mediumLvlColor = "red";
                changed = 1;
                screenText.clear();
                screenText.menu();
            }else if(HardY()){
                canvas.style.cursor = "pointer";
                hardLvlColor = "red";
                changed = 1;
                screenText.clear();
                screenText.menu();
            }else{
                if (changed) {
                    canvas.style.cursor = "initial";
                    easyLvlColor = "black";
                    mediumLvlColor = "black";
                    hardLvlColor = "black";
                    changed = 0;
                    screenText.clear();
                    screenText.menu();
                }
            }
        }else{
            if (changed) {
                canvas.style.cursor = "initial";
                easyLvlColor = "black";
                mediumLvlColor = "black";
                hardLvlColor = "black";
                changed = 0;
                screenText.clear();
                screenText.menu();
            }
        }
    }
}
