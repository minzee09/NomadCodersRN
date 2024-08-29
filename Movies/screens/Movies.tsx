import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Dimensions } from 'react-native'; // 화면의 사이즈 가져다 줌
import Swiper from 'react-native-web-swiper';
import styled from 'styled-components/native';

const ScrollView = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const View = styled.View`
  flex: 1;
`;

//동일하지만 아래 형식을 더 선호 => const SCREEN_HEIGHT = Dimensions.get("window").height;
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => (
  <ScrollView>
    <Swiper
      loop
      timeout={2}
      controlsEnabled={false}
      containerStyle={{ width: '100%', height: SCREEN_HEIGHT / 4 }}
    >
      <View style={{ backgroundColor: 'red' }}></View>
      <View style={{ backgroundColor: 'blue' }}></View>
      <View style={{ backgroundColor: 'green' }}></View>
    </Swiper>
  </ScrollView>
);
export default Movies;
