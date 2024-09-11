import React, { useRef, useState } from "react";
import { Animated, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const App: React.FC = () => {
  const POSITION = useRef(new Animated.ValueXY({ x: 0, y: 300 })).current; // useRef: 다시 렌더링이 일어나더라도 value를 유지하게 해줌, rerender하더라도 값이 초기값으로 돌아가지 않음.
  const [up, setUp] = useState(false);
  const toggleUp = () => setUp((prev) => !prev);

  const moveUp = () => {
    Animated.timing(POSITION, {
      duration: 3000,
      toValue: up ? 300 : -300,
      useNativeDriver: true, // 항상 true -> 관련 데이터들이 native쪽으로 전달
    }).start(toggleUp);
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
            transform: [{ rotateY: rotation }, { translateY: POSITION.y }],
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
