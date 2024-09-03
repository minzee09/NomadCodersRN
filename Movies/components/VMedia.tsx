import React from 'react';
import styled from 'styled-components/native';
import Poster from './Poster';
import Votes from './Votes';
import { useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native';

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate('Stack', { screen: 'Detail' });
  };

  return (
    <TouchableOpacity onPress={goToDetail}>
      <Movie>
        <Poster path={posterPath} />
        <Title>
          {originalTitle.slice(0, 12)}
          {originalTitle.length > 12 ? '...' : null}
        </Title>
        <Votes voteAverage={voteAverage} />
      </Movie>
    </TouchableOpacity>
  );
};

const Movie = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  font-weight: 600;
  color: white;
  margin: 8px 0 4px 0;
`;

export default VMedia;
