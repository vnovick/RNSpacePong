import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image
} from 'react-native';

export default function BackgroundScreen({ img, children, style }){
  return (
    <View style={[styles.container, style]}>
      <Image source={ require('../../assets/imgs/shield_texture.jpeg')} style={ styles.shield }/>
      <Image source={img || require('../../assets/imgs/player.png')} style={[styles.player]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  player: {
    width: 50,
    height: 50,
    left: 150
  },
  shield: {
    width: 50,
    height: 5,
    left: 150,
    marginBottom: 5
  }
});
