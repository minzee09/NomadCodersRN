import { moviesApi, tvApi } from '@/api';
import HList from '@/components/HList';
import Loader from '@/components/Loader';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const Search = () => {
  const [query, setQuery] = useState('');
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery({
    queryKey: ['searchMovies', query],
    queryFn: moviesApi.search,
    enabled: false, // 화면 mount해도 작동되지 않도록
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery({
    queryKey: ['searchTv', query],
    queryFn: tvApi.search,
    enabled: false, // 화면 mount해도 작동되지 않도록
  });
  const onChangeText = (text: string) => setQuery(text);

  const onSubmit = () => {
    if (query === '') {
      return;
    }
    searchMovies();
    searchTv();
  };

  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or Tv show"
        placeholderTextColor={'grey'}
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || tvLoading ? <Loader /> : null}
      {moviesData ? (
        <HList title={'Movie Results'} data={moviesData.results} />
      ) : null}
      {tvData ? <HList title={'TV Results'} data={tvData.results} /> : null}
    </Container>
  );
};

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 12px 16px;
  border-radius: 28px;
  width: 90%;
  margin: 12px auto;
  margin-bottom: 40px;
`;
export default Search;
