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
import {observer} from 'mobx-react/native';

class Board extends Component {

  constructor(){
    super();
  }

  componentDidMount(){
    this.props.gameManager.setColliders()
  }

  render() {
    const { levelCount, dimensions: { width: screenWidth, height: screenHeight } } = this.props.gameManager;
    return (
      <BackgroundScreen>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcome}>
              {` Welcome to Level ${levelCount} `}
            </Text>
          </View>
          <View>
              <View width={screenWidth} height={screenHeight - 50}>
                <View width={screenWidth} height={screenHeight - 150}>

                </View>
                <Ball { ...this.props }/>
                <PlayerPanel width={screenWidth} {...this.props} />
              </View>
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
});

export default observer(['gameManager'])(Board)

