import { observable, action, computed, autorun } from 'mobx';
import { InteractionManager } from 'react-native';
export default class GameManager {

  constructor(dimensions){
    this.dimensions = {
      width: dimensions.width,
      height: dimensions.height - 100
    }
  }

  @observable
  gameState = {
    over: false,
    idle: true,
    score: 0,
    lives: 5
  };

  @observable
  dimensions = {
    width: 0,
    height: 0
  };

  @observable
  levelCount = 0;

  @observable
  player = {
    pane: {
      x: 0,
      y: 0
    },
    ball: {
      x: 0,
      y: 0,
      speedX: 0,
      speedY: 0
    }
  }

  @action
  movePlayer(x){
    this.player.pane.x = x;
  }

  @action
  bounce(xVector, yVector){
    cancelAnimationFrame(this.raf);
    this.fireBall(xVector, yVector)
  }

  @action
  fireBall(speedX, speedY){
    this.gameState.idle = false;
    this.raf = requestAnimationFrame(() => {this.updateBall(speedX, speedY)});
  }

  updateBall(speedX, speedY){
    this.player.ball.speedX = speedX;
    this.player.ball.speedY = speedY;
    this.player.ball.x = this.player.ball.x + this.player.ball.speedX;
    this.player.ball.y = this.player.ball.y + this.player.ball.speedY * 5;
    if (this.player.ball.y < -100) {
      this.subtractLives()
    } else {
      this.raf = requestAnimationFrame(() => {this.updateBall(speedX, speedY)});
    }
    this.checkCollision()
  }

  gameOver(){
    this.gameState.over = true
  }

  subtractLives(){
    cancelAnimationFrame(this.raf);
    this.gameState.idle = true;
    this.player.ball = {
      x: this.player.pane.x,
      y: 0,
      speedX: 0,
      speedY: 0
    }
    this.gameState.lives = this.gameState.lives - 1;
    if (this.gameState.lives === 0){
      this.gameOver();
    }
  }

  @computed
  get shieldCoordinatesRange(){
    return {
      y: 50,
      x: this.player.pane.x,
    }
  }

  checkCollision(){
    if (this.player.ball.x > this.frameColliders.right.x) {
      this.bounce(-1, this.player.ball.speedY)
    }

    if (this.player.ball.x < this.frameColliders.left.x){
      this.bounce(1, this.player.ball.speedY)
    }

    if (this.player.ball.y > this.frameColliders.top.y) {
      this.bounce(this.player.ball.speedX, -1)
    }

    if (this.player.ball.y < this.player.pane.y && this.player.ball.x > this.player.pane.x && this.player.ball.x < this.player.pane.x + 50){
      this.bounce(this.player.ball.speedX, 1)
    }
  }





  @computed
  get frameColliders() {
    return {
      left: {
        x: 0,
      },
      top: {
        y: this.dimensions.height
      },
      right: {
        x: this.dimensions.width - 15
      }
    }
  };


  @action
  setInitialPosition(){
    this.player.pane.x = this.dimensions.width / 2 - 25;
    this.player.ball.x = this.dimensions.width / 2 - 10;
  }

  @action
  startGame(){
    this.levelCount = 1;
  }
}
