import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Multislider } from './demo/components/Multislider/Multilider';
import { Slider } from './demo/components/Slider/Slider';


export default function App() {
  const [values, setValues] = useState([1, 3, 5, 7, 9]);
  const [value, setValue] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.valueText}>{value}</Text>
      <Slider
        value={value}
        step={0.5}
        range={[0, 10]}
        onChangeFinished={setValue}
      />
      <Multislider
        style={styles.multislider}
        values={values}
        step={0.5}
        range={[0, 10]}
        onChangeFinished={(val, i) => {
          const newValues = [...values];
          newValues[i] = val;
          setValues(newValues);
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    fontSize: 30
  },
  multislider: {
    marginTop: 150
  }
});
