import React, {Component} from 'react';
import {Image, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
const imgPlus = require('../assets/plus.png');
export default class ToDoTasks extends Component {
  _goToTask() {
    this.props.navigation.navigate('Task');
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.floatButton}
          onPress={() => this._goToTask()}>
          <Image source={imgPlus} style={styles.img} />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  },
  icon: {
    width: 26,
    height: 26,
  },
  img: {
    width: 50,
    height: 50,
  },
  floatButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});
