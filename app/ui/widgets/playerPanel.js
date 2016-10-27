import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import Player from './player';

export default class PlayerPanel extends Component{
  render(){
    return (
      <View style={[this.props.style]}>
        <Player/>
      </View>
    );
  }
}
