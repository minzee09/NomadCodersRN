import { Movie } from '@/api';
import Poster from '@/components/Poster';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

type RootStackParamList = {
  Detail: Movie | Tv;
};
type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  useEffect(() => {
    setOptions({
      title:
        'original_title' in params
          ? params.original_title
          : params.original_name,
    });
  }, []);
  return (
    <Container>
      <Poster path={params.poster_path || ''} />
    </Container>
  );
};

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

export default Detail;
