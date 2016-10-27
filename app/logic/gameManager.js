import { observable, action } from 'mobx';

export default class GameManager {

  @observable
  levelCount = 0;

  @observable
  player = {
    pane: { x: 0 },
    ball: {
      x: 0,
      y: 0
    }
  };

  @action
  movePlayer(x){
    this.player.pane.x = x;
  }

  @action
  startGame(){
    this.levelCount = 1;
  }
}
