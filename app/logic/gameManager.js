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
      x: this.player.pane.x + 15,
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

  checkRightEdge(x, y, colliderX, height, colliderY, callback = () => {}){
    if (x > colliderX && y > colliderY && y < colliderY + height){
      this.bounce(-1, this.player.ball.speedY)
      callback();
    }
  }

  checkLeftEdge(x, y, colliderX,  height, colliderY, callback = () => {}){
    if (x < colliderX && y > colliderY && y < colliderY + height){
      this.bounce(1, this.player.ball.speedY)
      callback();
    }
  }

  checkTopEdge(x, y, colliderX, width, colliderY, callback = () => {}){
    if (y > colliderY && x > colliderX && x < colliderX + width) {
      this.bounce(this.player.ball.speedX, -1)
      callback();
    }
  }

  checkBottomEdge(x, y, colliderX, width, colliderY, callback = () => {}){
    if (y < colliderY && x > colliderX && x < colliderX + width) {
      this.bounce(this.player.ball.speedX, 1)
      callback();
    }
  }

  updateBrick(type, index){
      if (type === 1){
        this.bricks.splice(index, 1);
      }
      if (type === 2){
        this.bricks[index].type = 1;
      }
      this.gameState.score = this.gameState.score + 1;
      if (this.bricks.length === 0){
        this.levelCount = this.levelCount + 1;
        this.buildBrickWall();
      }
  }

  checkBoundaries(){
    const { x, y } = this.player.ball;
    this.checkRightEdge(x, y, this.frameColliders.right.x, this.dimensions.height, 0);
    this.checkLeftEdge(x, y, this.frameColliders.left.x, this.dimensions.height, 0);
    this.checkTopEdge(x, y, 0, this.frameColliders.right.x, this.dimensions.height);
    this.checkBottomEdge(x, y, this.player.pane.x, 50, this.player.pane.y);
  }

  checkBrickCollision(brick, index){
    const { x, y} = this.player.ball;
    const { x: brickX, y: brickY, width, height, type } = brick;
    this.checkTopEdge(x, y, brickX, width, brickY - height, this.updateBrick.bind(this, type, index));
    if (y > brickY) {
      this.checkBottomEdge(x, y, brickX, width, brickY, this.updateBrick.bind(this, type, index));
    }
    this.checkRightEdge(x, y, brickX + width, - height, brickY, this.updateBrick.bind(this, type, index));
    this.checkLeftEdge(x, y, brickX, - height, brickY, this.updateBrick.bind(this, type, index));
  }

  checkCollision(){
    this.checkBoundaries();
    this.bricks.map(this.checkBrickCollision.bind(this))
  }



  levelMatrix = {
    1: [
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 1, 0, 2, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]
    ],
    2: [
      [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 0, 1, 0, 1, 0, 2, 0, 0],
      [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [0, 1, 1, 2, 0, 1, 0, 0, 0, 0, 0, 1],
      [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1]
    ],
    3: [
      [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 0, 1, 0, 1, 0, 2, 0, 0],
      [0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0],
      [1, 2, 0, 0, 0, 0, 1, 0, 0, 0, 2, 1],
      [0, 0, 0, 2, 0, 1, 0, 1, 0, 2, 0, 0],
      [2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 0, 1, 0, 1, 0, 2, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  }

  @observable
  bricks = []


  @action
  buildBrickWall(){
    const matrix = this.levelMatrix[this.levelCount] || this.levelMatrix[3]
    matrix.forEach((row, rIndex) => row.forEach((column, cIndex) => {
      if (column > 0){
        this.bricks.push({
          x: cIndex * this.levelGrid.columnWidth,
          y: this.dimensions.height - 50 - rIndex * this.levelGrid.rowHeight,
          width: this.levelGrid.columnWidth,
          height: this.levelGrid.rowHeight / 1.5,
          type: column
        })
      }
    }))
  }

  @computed
  get levelGrid(){
    return {
      columnWidth: this.dimensions.width / 12,
      rowHeight: this.dimensions.height / 24
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
