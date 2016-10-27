import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  View
} from 'react-native';
import ball from '../../assets/imgs/ball.png'

export default function Button({ onPress, children, textStyle, containerStyle }){
  return (
   <Image source={ball} resizeMode="contain" style={{position:"absolute", left:0, top:0, height:25,width:25}} />
  )
}
