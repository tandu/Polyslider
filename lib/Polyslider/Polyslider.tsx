import * as React from 'react';
import { useState } from 'react';
import { StyleProp, View, ViewStyle, PanResponder, PanResponderInstance } from 'react-native';


type PolysliderProps = {
  range: [number,  number];
  containerStyle: StyleProp<ViewStyle>;
  markersContainerStyle: StyleProp<ViewStyle>;
  track: (width: number) => React.ReactElement;
  marker: (val: number, index: number) => React.ReactElement;
  values: number[];
  onChange: (val: number, index: number) => void;
  onChangeFinished: (index: number) => void;
}


export const Polyslider = ({
  range,
  values,
  containerStyle,
  markersContainerStyle,
  track,
  marker,
  onChange,
  onChangeFinished
}: PolysliderProps) => {
  const [width, setWidth] = useState(0);
  const [handlers, setHandlers] = React.useState<PanResponderInstance[]>([]);
  const [startX, setStartX] = useState(0);
  const [startValue, setStartValue] = useState(0);

  React.useEffect(() => {
    setHandlers(values.map((v, i) =>
      PanResponder.create({
        onPanResponderTerminationRequest: () => false,
        onMoveShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrant: (e, gestureState) => {
          setStartX(gestureState.x0);
          setStartValue(values[i]);
        },
        onPanResponderMove: (e, gestureState) => {
          onChange(width ? startValue + (range[1] - range[0]) * (gestureState.moveX - startX) / width : 0, i);
        },
        onPanResponderRelease: () => onChangeFinished(i)
      })
    ));
  }, [values, startValue, width, startX]);

  return (
    <View style={containerStyle}>
      {track(width)}
      <View style={markersContainerStyle} onLayout={e => setWidth(e.nativeEvent.layout.width)}/>
      {values.map((val, i) =>
        <View key={i} style={{position: 'absolute', left: (val - range[0]) / (range[1] - range[0]) * width}} {...handlers[i]?.panHandlers}>
          {marker(val, i)}
        </View>
      )}
    </View>
  );
}
