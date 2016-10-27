import { extendObservable, action, autorun } from 'mobx';

export default class GameManager {

  constructor(){
    extendObservable(this, {
      levelCount: 0,
    });

    this.startGame = action(this.startGame);
  }

  ballHit(hitVal,direction){}

  onEndHit(direction){}

  onSideHit(){}
  
  startGame(){
    this.levelCount = 1;
  }
}
