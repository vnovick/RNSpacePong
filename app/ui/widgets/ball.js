import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import { observer } from 'mobx-react/native';


@observer(['gameManager'])
export default class Ball extends Component {

  componentDidMount(){
    setTimeout(()=>{
      this.props.gameManager.fireBall(1, 1);
    }, 1000)
    setTimeout(()=>{
      this.props.gameManager.bounce();
    }, 5000)
  }

  render(){
    const { player: { ball } } = this.props.gameManager;
    return (
      <View>
        <Text style={{ position: 'absolute', bottom: ball.y, left: ball.x, color: 'red'}}>the Ball</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  player: {
    width: 50,
    height: 50
  },
  shield: {
    width: 50,
    height: 5,
    marginBottom: 5
  }
});
