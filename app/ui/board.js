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
import PlayerPanel from './widgets/playerPanel';
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
              <Stage width={this.dimensions.width} height={this.dimensions.height - 50}>
                <World height={this.dimensions.height - 200}>
                  <View width={this.dimensions.width} height={this.dimensions.height - 150}>
                    <Text style={{ position: 'absolute', bottom: 0, color: 'red'}}>the Ball</Text>
                  </View>
                  <PlayerPanel style={{ width: this.dimensions.width}} {...this.props} />
                </World>
              </Stage>
          </Loop>
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
});

export default observer(['gameManager'])(Board)

