import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList } from 'react-native'; //Dimensions => 화면의 사이즈 가져다 줌
import Swiper from 'react-native-web-swiper';
import styled from 'styled-components/native';
import Slide from '@/components/Slide';
import HMedia from '@/components/HMedia';
import VMedia from '@/components/VMedia';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Movie, MovieResponse, moviesApi } from '@/api';
import Loader from '@/components/Loader';
import HList from '@/components/HList';

//동일하지만 아래 형식을 더 선호 => const SCREEN_HEIGHT = Dimensions.get("window").height;
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const queryClient = useQueryClient();
  const [refresh, setRefresh] = useState(false);
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResponse>({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: moviesApi.nowPlaying,
  });

  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery<MovieResponse>({
    queryKey: ['movies', 'trending'],
    queryFn: moviesApi.trending,
  });

  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
  } = useQuery<MovieResponse>({
    queryKey: ['movies', 'upcoming'],
    queryFn: moviesApi.upcoming,
  });

  const onRefresh = async () => {
    setRefresh(true);
    await queryClient.refetchQueries({ queryKey: ['tv'] });
    setRefresh(false);
  };

  const renderHMedia = ({ item }: { item: Movie }) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      releaseDate={item.release_date}
      overview={item.overview}
      fullData={item}
    />
  );

  const movieKeyExtractor = (item: Movie) => item.id + '';

  const loading = nowPlayingLoading || trendingLoading || upcomingLoading;

  //인터페이스 작성 위해
  // if (nowPlayingData) {
  //   console.log(
  //     Object.entries(nowPlayingData[0])
  //       .map((a) => `${a[0]}:${typeof a[1]};`)
  //       .join('\r\n'),
  //   );
  // }

  return loading ? (
    <Loader />
  ) : upcomingData ? (
    <FlatList
      refreshing={refresh}
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
            {nowPlayingData?.map((movie: Movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
                fullData={movie}
              />
            ))}
          </Swiper>
          <HList title="Trending Movies" data={trendingData} />
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      }
      ItemSeparatorComponent={HSeparator}
      keyExtractor={movieKeyExtractor}
      data={upcomingData}
      renderItem={renderHMedia}
    />
  ) : null;
};

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
