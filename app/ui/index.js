import React, { Component } from 'react';
import {
  Navigator,
  View
} from 'react-native';

import GameManager from '../logic/gameManager';
import Splash from './splash';
import Home from './home';
import Board from './board';

const routes = {
  splash: Splash,
  home: Home,
  board: Board
};

export default class Index extends Component {

  constructor(){
    super();
    this.gameManager = new GameManager();
  }

  renderScene({ id }, navigator){
    const Scene = routes[id]
    return <Scene {...this.props} navigator={navigator} gameManager={ this.gameManager }/>
  }


  render(){
    return (
        <View style={{flex:1}}>
            <Navigator
              style={{flex: 1}}
              ref={'NAV'}
              initialRoute={{id: 'splash', name: 'splash'}}
              renderScene={this.renderScene.bind(this)}
            />
        </View>
    )
  }
}
