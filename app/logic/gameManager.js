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

  flyingBall(){

  }
  
  startGame(){
    this.levelCount = 1;
    setTimout(() => this.flyingBall, 1000)
  }
}
