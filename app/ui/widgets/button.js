import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text
} from 'react-native';

export default function Button({ onPress, children, textStyle, containerStyle }){
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Text style={ textStyle }>{ children }</Text>
    </TouchableOpacity>
  )
}
