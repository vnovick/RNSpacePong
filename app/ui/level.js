import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import Brick from './widgets/brick';

import { observer } from 'mobx-react/native';


@observer(['gameManager'])
export default class Level extends Component{

  componentWillMount(){
    this.props.gameManager.buildBrickWall()
  }

  render(){
    const { width, height, gameManager: { bricks } } = this.props;
    return (
      <View style={{
        width, height
      }}>
        { bricks.map((brick, index) => (
          <Brick key={index} type={brick.type} style={{
            bottom: brick.y,
            left: brick.x,
            width: brick.width,
            height: brick.height}}
          />
        ))}
      </View>
    );
  }
}
