/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';
import BackgroundScreen from './widgets/background';
import PlayerPanel from './widgets/playerPanel';
import Ball from './widgets/ball';
import Level from './level';
import {observer} from 'mobx-react/native';

class Board extends Component {

  constructor(){
    super();
  }

  componentDidMount(){
    // this.props.gameManager.setColliderFrame()
  }

  render() {
    const { levelCount, gameState: { over: gameOver, score, lives }, dimensions: { width: screenWidth, height: screenHeight } } = this.props.gameManager;
    return (
      <BackgroundScreen>
        { gameOver ?
          <View style={{ position: 'absolute', width: screenWidth, height: screenHeight, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 40 }}>Game Over</Text>
          </View> : false
        }
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcome}>
              {` Welcome to Level ${levelCount} `}
            </Text>
          </View>
          <View>
              <View width={screenWidth} height={screenHeight}>
                <Level width={screenWidth} height={screenHeight - 50} gameManager={this.props.gameManager}/>
                <Ball { ...this.props }/>
                <PlayerPanel width={screenWidth} {...this.props} />
              </View>
          </View>
          <View style={ [styles.uiLayer, { width: screenWidth }] }>
            <Text style={ styles.uiPanel }>{`score: ${score}`}</Text>
            <Text style={ styles.uiPanel }>{`lives: ${lives}`}</Text>
          </View>
      </BackgroundScreen>
    );
  }
}

const styles = StyleSheet.create({
  welcomeContainer: {
    height: 50,
    marginTop: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  uiLayer: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uiPanel: {
    width: 50,
    color: 'white',
    fontSize: 20,
  }
});

export default observer(['gameManager'])(Board)

