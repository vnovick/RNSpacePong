import React, { Component } from 'react';
import {
  View,
  Image
} from 'react-native';
import styles from '../../styles/shared';

export default function BackgroundScreen({ img, children, style }){
  return (
    <View style={[styles.container, style]}>
      <Image source={img || require('../../assets/imgs/background.jpg')} style={[styles.backgroundImage, styles.container]} >
        { children }
      </Image>
    </View>
  );
}
