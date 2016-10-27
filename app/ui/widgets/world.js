import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

export default class World extends Component{
  render(){
    return (
      <View style={[this.props.style]}>
        <Text>World</Text>
      </View>
    );
  }
}
