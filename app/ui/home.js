/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  LayoutAnimation,
  View,
  Image
} from 'react-native';
import GameMenu from './widgets/menu';
import BackgroundScreen from './widgets/background';
export default class Home extends Component {

  componentWillMount() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  render() {
    return (
    <BackgroundScreen>
      <GameMenu {...this.props} />
    </BackgroundScreen>
    );
  }
}

