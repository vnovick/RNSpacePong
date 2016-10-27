import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image
} from 'react-native';

import { observer } from 'mobx-react/native';


@observer(['gameManager'])
export default class Ball extends Component {

  render(){
    const { player: { ball } } = this.props.gameManager;
    return (
      <View>
        <Image source={ require('../../assets/imgs/pong_transparent.png')} style={[ styles.ball, {bottom: ball.y, left: ball.x}]}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ball: {
    position: 'absolute',
    width: 15,
    height: 15
  },
  shield: {
    width: 50,
    height: 5,
    marginBottom: 5
  }
});
