import React, { useRef, useState } from "react";
import { Animated, Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const App: React.FC = () => {
  const POSITION = useRef(
    new Animated.ValueXY({ x: -SCREEN_WIDTH / 2 + 100, y: -SCREEN_HEIGHT / 2 + 100 }),
  ).current; // useRef: 다시 렌더링이 일어나더라도 value를 유지하게 해줌, rerender하더라도 값이 초기값으로 돌아가지 않음.
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
  const moveUp = () => {
    Animated.loop(Animated.sequence([bottomLeft, bottomRight, topRight, topLeft])).start();
  };
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
  return (
    <Container>
      <TouchableOpacity onPress={moveUp}>
        <AnimatedBox
          style={{
            borderRadius: borderRadius,
            backgroundColor: bgColor,
            transform: [
              ...POSITION.getTranslateTransform(), // 이거랑 같음 { translateY: POSITION.y },{ translateX: POSITION.x }
            ],
          }}
        />
      </TouchableOpacity>
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
