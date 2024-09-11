import React, { useRef, useState } from "react";
import { Animated, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const App: React.FC = () => {
  const Y = useRef(new Animated.Value(200)).current; // useRef: 다시 렌더링이 일어나더라도 value를 유지하게 해줌, rerender하더라도 값이 초기값으로 돌아가지 않음.
  const [up, setUp] = useState(false);
  const toggleUp = () => setUp((prev) => !prev);

  const moveUp = () => {
    Animated.timing(Y, {
      toValue: up ? 200 : -200,
      useNativeDriver: true, // 항상 true -> 관련 데이터들이 native쪽으로 전달
    }).start(toggleUp);
  };
  return (
    <Container>
      <TouchableOpacity onPress={moveUp}>
        <AnimatedBox style={{ transform: [{ translateY: Y }] }} />
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
