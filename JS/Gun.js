class Gun {
    readyToFire = false;
    yVel = 14;
    cooldown = 2000;
    x1 = paddleX + 5;
    y1 = paddleY + paddle.height / 2;
    x2 = paddleX + paddle.width - 5;
    y2 = paddleY + paddle.height / 2;
  
    fire() {
      Bullet.getAll.push(new Bullet(this.x1, this.y1));
      Bullet.getAll.push(new Bullet(this.x2, this.y2));
    }
  
    mouseFire() {
        if (this.readyToFire === true) {
          this.fire();
          this.readyToFire = false;
          setTimeout(() => this.readyToFire = true, this.cooldown);
        }
        this.readyToFire = false;
      };
    }
  
    document.addEventListener("keydown", function (event) {
      if (
        event.keyCode == "90" &&
        (game.isStarted || !game.isLost || !game.isWin)
      ) {
        gu = new Gun();
        gu.readyToFire = true;
        gu.mouseFire();
      }
  
    });