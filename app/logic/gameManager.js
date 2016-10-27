import { observable, action, computed, autorun } from 'mobx';

export default class GameManager {

  constructor(dimensions){
    this.dimensions = dimensions
  }

  @observable
  dimensions = {
    width: 0,
    height: 0
  };

  @observable
  levelCount = 0;

  @observable
  player = {
    pane: { x: 0 },
    ball: {
      x: 0,
      y: 0,
      speedX: 0,
      speedY: 0
    }
  };

  @action
  movePlayer(x){
    this.player.pane.x = x;
  }

  @action
  bounce(){
    clearInterval(this.interval);
    this.fireBall(1, -1)
  }

  @action
  fireBall(speedX, speedY, dx, dy){
    this.player.ball.speedX = speedX;
    this.player.ball.speedY = speedY;

    this.interval = setInterval(()=>{
      this.player.ball.x = this.player.ball.x + this.player.ball.speedX;
      this.player.ball.y = this.player.ball.y + 2 * this.player.ball.speedY;
      console.log(this.player.ball.x, this.player.ball.y)
    },25)
  }

  @computed
  get shieldCoordinatesRange(){
    return {
      y: 50,
      x: this.player.pane.x,
    }
  }

  @action
  setColliders(){

  }

  @action
  startGame(){
    this.levelCount = 1;
  }
}
