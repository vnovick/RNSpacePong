import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';


const getBrickTypes = (style) => ({
  1: <View style={[ style , styles.brick]}></View>,
  2: <Image source={require('../../assets/imgs/asteroid_texture.gif')} style={[ style, styles.brick, { height: style.height + 2, borderWidth: 2, }]}/>
});


export default function Brick({ style, type }){
  return getBrickTypes(style)[type]
}

const styles = StyleSheet.create({
  brick: {
    position: 'absolute',
    backgroundColor: '#87CEFA',
  }
});
