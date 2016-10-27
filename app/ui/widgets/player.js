import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';


export default class Player extends Component {

  componentDidMount(){
    this.props.gameManager.setInitialPosition();
  }

  render(){
    return (
        <View style={{ left: this.props.x }} ref={(b) => this.player = b}>
          <Image source={ require('../../assets/imgs/shield_texture.jpeg')} style={ styles.shield }/>
          <Image source={ require('../../assets/imgs/player.png')} style={[styles.player]} />
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
