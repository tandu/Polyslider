import React, { useEffect, useMemo, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Polyslider } from '../../../lib/Polyslider/Polyslider';
import { Label } from './Label';


type MultiliderProps = {
  values: number[];
  range: [number, number];
  labelText?: (val: number) => string;
  onChangeFinished?: (val: number, index: number) => void;
  onChange?: (val: number, index: number) => void;
  step?: number;
  style?: StyleProp<ViewStyle>;
}


const colors = ['red', 'green', 'blue'];


export const Multislider = ({ values, range, labelText, onChange, onChangeFinished, style, step = 1 }: MultiliderProps) => {
  const [curValues, setCurValues] = useState<number[]>([0]);
  const [isPan, setIsPan] = useState(false);

  useEffect(() => {
    !isPan && setCurValues(values);
  }, [values, range, isPan]);

  function snapValue(val: number, i: number) {
    return Math.max(i > 0 ? curValues[i - 1] + step : range[0], Math.min(i < curValues.length - 1 ? curValues[i + 1] - step : range[1], val));
  }

  const track = useMemo(() => (width: number) => {
    const k = width / (range[1] - range[0]);
    return (
      <View style={{position: 'absolute', height: 6, top: 13, borderRadius: 5, width: '100%', backgroundColor: '#ac7ef4'}}>
        {[...Array(curValues.length - 1)].map((_, i) =>
          <View key={i} style={{
            position: 'absolute',
            backgroundColor: colors[i % colors.length], left: (curValues[i] - range[0]) * k,
            width: (curValues[i + 1] - curValues[i]) * k,
            height: 5
          }}/>
        )}
      </View>
    );
  }, [curValues, range]);

  const marker = useMemo(() => (val: number) =>
    <View style={{marginLeft: 12}}>
      <Label style={{position: 'absolute', marginTop: -10}} value={labelText?.(val) ?? Math.round(val / step) * step}/>
      <View style={{borderRadius: 15, backgroundColor: '#6739af', borderWidth: 4, borderColor: '#ac7ef4', width: 28, height: 28, marginLeft: -14}}/>
    </View>
  , [step]);

  return (
    <Polyslider
      range={range}
      values={curValues}
      containerStyle={[{height: 30, width: '80%', justifyContent: 'flex-end'}, style]}
      markersContainerStyle={{marginHorizontal: 12}}
      track={track}
      marker={marker}
      onChangeFinished={i => {
        setIsPan(false);
        const val = snapValue(curValues[i], i);
        onChangeFinished?.(Math.round(val / step) * step, i);
      }}
      onChange={(val, i) => {
        setIsPan(true);
        const newValues = [...curValues];
        newValues[i] = snapValue(val, i);
        setCurValues(newValues);
        onChange?.(Math.round(newValues[i] / step) * step, i);
      }}
    />
  );
}