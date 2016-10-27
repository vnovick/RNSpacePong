import { observable, action } from 'mobx';

export default class GameManager {

  @observable
  levelCount = 0;

  @action
  startGame(){
    this.levelCount = 1;
  }
}
