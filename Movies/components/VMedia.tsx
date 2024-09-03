import React from 'react';
import styled from 'styled-components/native';
import Poster from './Poster';
import Votes from './Votes';
import { useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Movie } from '@/api';

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  fullData: Movie | TV;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
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
      <Container>
        <Poster path={posterPath} />
        <Title>
          {originalTitle.slice(0, 12)}
          {originalTitle.length > 12 ? '...' : null}
        </Title>
        <Votes voteAverage={voteAverage} />
      </Container>
    </TouchableOpacity>
  );
};

const Container = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  font-weight: 600;
  color: white;
  margin: 8px 0 4px 0;
`;

export default VMedia;
