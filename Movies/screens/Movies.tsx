import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList } from 'react-native'; //Dimensions => 화면의 사이즈 가져다 줌
import Swiper from 'react-native-web-swiper';
import styled from 'styled-components/native';
import Slide from '@/components/Slide';
import HMedia from '@/components/HMedia';
import VMedia from '@/components/VMedia';
import { useQuery } from '@tanstack/react-query';
import { moviesApi } from '@/api';

//동일하지만 아래 형식을 더 선호 => const SCREEN_HEIGHT = Dimensions.get("window").height;
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery({
    queryKey: ['nowPlaying'],
    queryFn: moviesApi.nowPlaying,
  });
  const { isLoading: trendingLoading, data: trendingData } = useQuery({
    queryKey: ['trending'],
    queryFn: moviesApi.trending,
  });
  const { isLoading: upcomingLoading, data: upcomingData } = useQuery({
    queryKey: ['upcoming'],
    queryFn: moviesApi.upcoming,
  });

  const onRefresh = async () => {};

  const renderVMedia = ({ item }) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  );

  const renderHMedia = ({ item }) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      releaseDate={item.release_date}
      overview={item.overview}
    />
  );

  const movieKeyExtractor = (item) => item.id + '';

  const loading = nowPlayingLoading || trendingLoading || upcomingLoading;

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        //모든 FlatList들을 랜더링하는 역할 | 하지만 리스트의 헤더 역할도 가능함
        <>
          <Swiper
            loop
            timeout={2}
            controlsEnabled={false}
            containerStyle={{
              marginBottom: 32,
              width: '100%',
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 30 }}
              data={trendingData}
              keyExtractor={movieKeyExtractor}
              ItemSeparatorComponent={VSeparator}
              renderItem={renderVMedia}
            />
          </ListContainer>
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
          <FlatList
            ItemSeparatorComponent={HSeparator}
            keyExtractor={movieKeyExtractor}
            data={upcomingData}
            renderItem={renderHMedia}
          />
        </>
      }
    />
  );
};

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 32px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const VSeparator = styled.View`
  width: 20px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

export default Movies;
