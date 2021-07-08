import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';


type SliderLabelProps = {
  value: string | number;
  style: StyleProp<ViewStyle>;
}


export const Label = ({ value, style }: SliderLabelProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.pointer, styles.frame]}/>

      <View style={[styles.textContainer, styles.frame]}>
        <Text style={styles.text}>{value}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 0
  },
  textContainer: {
    top: -23,
    position: 'absolute',
    zIndex: 100,
    paddingHorizontal: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
    lineHeight: 22
  },
  pointer: {
    position: 'absolute',
    width: 18,
    height: 18,
    top: -12,
    transform: [{ rotateY: '55deg' }, { rotateZ: '45deg' }],
  },
  frame: {
    borderRadius: 3,
    backgroundColor: '#8a8a8a',
  }
});
