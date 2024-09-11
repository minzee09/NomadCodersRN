import React, { useRef, useState } from "react";
import { Animated, Dimensions, PanResponder } from "react-native";
import styled from "styled-components/native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const App: React.FC = () => {
  const POSITION = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current; // useRef: 다시 렌더링이 일어나더라도 value를 유지하게 해줌, rerender하더라도 값이 초기값으로 돌아가지 않음.
  const topLeft = Animated.timing(POSITION, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: false, // bg색 에니메이션 주려면 false로 해야 적용 됨
  });
  const bottomLeft = Animated.timing(POSITION, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: false, // bg색 에니메이션 주려면 false로 해야 적용 됨
  });
  const bottomRight = Animated.timing(POSITION, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: false, // bg색 에니메이션 주려면 false로 해야 적용 됨
  });
  const topRight = Animated.timing(POSITION, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: false, // bg색 에니메이션 주려면 false로 해야 적용 됨
  });
  // Interpolation
  const opacityValue = POSITION.y.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0, 1],
  });
  const borderRadius = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });
  const rotation = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["-360deg", "360deg"],
  });
  const bgColor = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255,99,71)", "rgb(71,166,255)"],
  });
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, // touch 감지
      onPanResponderGrant: () => {
        console.log("Touch Started");
        // 마지막으로 놓인 위치에서 시작하도록
        POSITION.setOffset({
          x: POSITION.x._value, // number로 지정하기 위해
          y: POSITION.y._value,
        });
      },
      onPanResponderMove: (_, { dx, dy }) => {
        console.log("Touching");
        // 움직임에 대한 정보를 받을 수 있음
        POSITION.setValue({
          x: dx,
          y: dy,
        });
      },
      onPanResponderRelease: () => {
        console.log("Touch Finished");
        POSITION.flattenOffset(); // offSet을 다시 0으로 초기화
      },
    }),
  ).current;
  return (
    <Container>
      <AnimatedBox
        {...panResponder.panHandlers} // function 제공 받기 위해, panHandlers는 그냥 함수 묶음
        style={{
          borderRadius: borderRadius,
          backgroundColor: bgColor,
          transform: [
            ...POSITION.getTranslateTransform(), // 이거랑 같음 { translateY: POSITION.y },{ translateX: POSITION.x }
          ],
        }}
      />
    </Container>
  );
};

export default App;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);
