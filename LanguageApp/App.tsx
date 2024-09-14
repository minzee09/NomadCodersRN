import React, { useRef, useState } from "react";
import { Animated, PanResponder } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import icons from "./icons";

const App: React.FC = () => {
  // Values
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const rotation = position.interpolate({
    inputRange: [-250, 250],
    outputRange: ["-15deg", "15deg"],
    extrapolate: "extend", // input의 범위 바깥으로 나갔을 때 어떻게 처리할 지 명시
  });
  const secondScale = position.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.5, 1],
    extrapolate: "clamp",
  });
  // Animations
  const onPressIn = Animated.spring(scale, { toValue: 0.95, useNativeDriver: true });
  const onPressOut = Animated.spring(scale, { toValue: 1, useNativeDriver: true });
  const goCenter = Animated.spring(position, { toValue: 0, useNativeDriver: true });
  const goLeft = Animated.spring(position, {
    toValue: -500,
    tension: 5,
    useNativeDriver: true,
    restDisplacementThreshold: 100, // animation 기간 조절 (여기서는 더 짧게 전환 되도록 하였음)
    restSpeedThreshold: 100,
  });
  const goRight = Animated.spring(position, {
    toValue: 500,
    tension: 5,
    useNativeDriver: true,
    restDisplacementThreshold: 100,
    restSpeedThreshold: 100,
  });
  // Pan Responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx);
      },
      onPanResponderGrant: () => onPressIn.start(),
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -250) {
          goLeft.start(onDismiss);
        } else if (dx > 250) {
          goRight.start(onDismiss);
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    }),
  ).current;

  // State
  const [index, setIndex] = useState(0);
  const onDismiss = () => {
    scale.setValue(1);
    position.setValue(0);
    setIndex((prev) => prev + 1);
  };
  const closePress = () => {
    goLeft.start(onDismiss);
  };
  const checkPress = () => {
    goRight.start(onDismiss);
  };

  return (
    <Container>
      <CardContainer>
        <AnimatedCard {...panResponder.panHandlers} style={{ transform: [{ scale: secondScale }] }}>
          <Ionicons name={icons[index + 1]} color="#192a56" size={98} />
        </AnimatedCard>
        <AnimatedCard
          {...panResponder.panHandlers}
          style={{
            transform: [{ scale: scale }, { translateX: position }, { rotateZ: rotation }],
          }}
        >
          <Ionicons name={icons[index]} color="#192a56" size={98} />
        </AnimatedCard>
      </CardContainer>
      <BtnContainer>
        <Btn onPress={closePress}>
          <Ionicons name="close-circle" color="white" size={58} />
        </Btn>
        <Btn onPress={checkPress}>
          <Ionicons name="checkmark-circle" color="white" size={58} />
        </Btn>
      </BtnContainer>
    </Container>
  );
};

export default App;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #00a8ff;
`;

const Card = styled.View`
  position: absolute;
  background-color: white;
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  elevation: 6;
`;

const AnimatedCard = Animated.createAnimatedComponent(Card);

const Btn = styled.TouchableOpacity`
  margin: 0 10px;
`;

const BtnContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;

const CardContainer = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`;
