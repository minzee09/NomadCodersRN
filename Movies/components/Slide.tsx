import { makeImgPath } from '@/utilities/utils';
import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import styled from 'styled-components/native';
import Poster from './Poster';

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
}) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={{ flex: 1 }}>
      <BgImg
        source={{ uri: makeImgPath(backdropPath) }}
        blurRadius={5}
        style={StyleSheet.absoluteFill} // width: 100%, height: 100%, position: absolute과 동일함
      />
      <BlurView
        tint={isDark ? 'dark' : 'light'}
        experimentalBlurMethod="none"
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title>{originalTitle}</Title>
            <Votes>⭐ {voteAverage.toFixed(1)}/10</Votes>
            <Overview>{overview.slice(0, 100)}...</Overview>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

const BgImg = styled.Image``;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;
const Overview = styled.Text`
  margin-top: 8px;
  color: rgba(255, 255, 255, 0.8);
`;
const Votes = styled(Overview)`
  font-size: 12px;
`;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  width: 50%;
  margin-left: 16px;
`;

export default Slide;
