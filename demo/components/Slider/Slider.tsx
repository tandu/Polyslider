import React, { useEffect, useMemo, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Polyslider } from '../../../lib/Polyslider/Polyslider';


type MultiliderProps = {
  value: number;
  range: [number, number];
  onChangeFinished?: (val: number) => void;
  onChange?: (val: number) => void;
  step?: number;
  style?: StyleProp<ViewStyle>;
}


export const Slider = ({ value, range, onChange, onChangeFinished, style, step = 1 }: MultiliderProps) => {
  const [curValue, setCurValue] = useState<number>(0);
  const [isPan, setIsPan] = useState(false);

  useEffect(() => {
    !isPan && setCurValue(value);
  }, [value, range, isPan]);

  function snapValue(val: number) {
    return Math.max(range[0], Math.min(range[1], val));
  }

  const track = useMemo(() => () =>
    <View style={{position: 'absolute', height: 6, top: 13, borderRadius: 5, width: '100%', backgroundColor: '#ac7ef4'}}/>
  , [curValue, range]);

  const marker = useMemo(() => () =>
    <View style={{marginLeft: 12}}>
      <View style={{borderRadius: 15, backgroundColor: '#6739af', borderWidth: 4, borderColor: '#ac7ef4', width: 28, height: 28, marginLeft: -14}}/>
    </View>
  , [step]);

  return (
    <Polyslider
      range={range}
      values={[curValue]}
      containerStyle={[{height: 30, width: '80%', justifyContent: 'flex-end'}, style]}
      markersContainerStyle={{marginHorizontal: 12}}
      track={track}
      marker={marker}
      onChangeFinished={i => {
        setIsPan(false);
        onChangeFinished?.(Math.round(snapValue(curValue) / step) * step);
      }}
      onChange={(val, i) => {
        setIsPan(true);
        const newValue = snapValue(val);
        setCurValue(newValue);
        onChange?.(Math.round(newValue / step) * step);
      }}
    />
  );
}