import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import VMedia from './VMedia';

interface HListProps {
  title: string;
  data: any[];
}

const HList: React.FC<HListProps> = ({ title, data }) => {
  return (
    <ListContainer>
      <ListTitle> {title}</ListTitle>
      <FlatList
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={HListSeparator}
        contentContainerStyle={{ paddingHorizontal: 30 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_title ?? item.original_name}
            voteAverage={item.vote_average}
            fullData={item}
          />
        )}
      />
    </ListContainer>
  );
};

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 32px;
  margin-bottom: 20px;
`;

export const HListSeparator = styled.View`
  width: 20px;
`;

export default HList;
