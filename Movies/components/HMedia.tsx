import React from 'react';
import styled from 'styled-components/native';
import Poster from './Poster';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import { Movie } from '@/api';

interface HMediaProps {
  posterPath: string;
  originalTitle: string;
  releaseDate: string;
  overview: string;
  fullData: Movie;
}

const HMedia: React.FC<HMediaProps> = ({
  posterPath,
  originalTitle,
  releaseDate,
  overview,
  fullData,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    //@ts-ignore
    navigation.navigate('Stack', {
      screen: 'Detail',
      params: {
        ...fullData,
      },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <HMovie>
        <Poster path={posterPath} />
        <HColumn>
          <Title>{originalTitle}</Title>
          <Release>
            {new Date(releaseDate).toLocaleDateString('ko', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </Release>
          <Overview>{overview.slice(0, 100)}...</Overview>
        </HColumn>
      </HMovie>
    </TouchableOpacity>
  );
};

const HMovie = styled.View`
  padding: 0 32px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 16px;
  width: 80%;
`;

const Title = styled.Text`
  font-weight: 600;
  color: white;
  margin: 8px 0 4px 0;
`;

const Overview = styled.Text`
  margin-top: 8px;
  color: rgba(255, 255, 255, 0.8);
  width: 80%;
`;

const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin: 8px 0;
`;

export default HMedia;
