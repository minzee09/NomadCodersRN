import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

type RootStackParamList = {
  Detail: { originalTitle: string };
};
type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: {
    params: { originalTitle },
  },
}) => {
  useEffect(() => {
    setOptions({ title: originalTitle });
  }, []);
  console.log(originalTitle);
  return (
    <Container>
      <Text>{originalTitle}</Text>
    </Container>
  );
};

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

export default Detail;
