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
  View,
  Dimensions
} from 'react-native';
import BackgroundScreen from './widgets/background';
import Player from './widgets/player';
import { Loop, World, Stage } from 'react-game-kit/native';
import {observer} from 'mobx-react/native';

class Board extends Component {

  constructor(){
    super();
    this.dimensions = Dimensions.get('window');
  }

  render() {
    const { levelCount } = this.props.gameManager;
    return (
      <BackgroundScreen>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcome}>
              {` Welcome to Level ${levelCount} `}
            </Text>
          </View>
          <Loop>
              <Stage width={this.dimensions.width} height={this.dimensions.height - 200}>
                <World>
                  <Text style={{ position: 'absolute', bottom: 0}}>a</Text>
                </World>
                <View style={{ backgroundColor: 'red', width: this.dimensions.width, height: 80}}>
                  <Player/>
                </View>
              </Stage>
          </Loop>
      </BackgroundScreen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  playerPanel: {
    height: 80,
  },
  welcomeContainer: {
    height: 100
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default observer(['gameManager'])(Board)

