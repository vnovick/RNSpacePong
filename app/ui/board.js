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

import {observer} from 'mobx-react/native';

class Board extends Component {

  componentDidMount(){

  }

  render() {
    const { levelCount } = this.props.gameManager;
    return (
      <BackgroundScreen>
        <Text style={styles.welcome}>
          {` Welcome to Level ${levelCount} `}
        </Text>
      </BackgroundScreen>
    );
  }
}

const styles = StyleSheet.create({
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

