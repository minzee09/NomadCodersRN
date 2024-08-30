import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  View,
  Text,
} from 'react-native'; //Dimensions => 화면의 사이즈 가져다 줌
import Swiper from 'react-native-web-swiper';
import styled from 'styled-components/native';
import Slide from '@/components/Slide';
import HMedia from '@/components/HMedia';
import VMedia from '@/components/VMedia';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGMxNmU3ZWY4YTI1OWIxYjU1ZjRhYzg4N2ExZGNjMyIsIm5iZiI6MTcyNDk1MDExMS4yMjM4ODUsInN1YiI6IjY2ZDBhNThmYzcxYjc1YzllZDcwNTA0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EmIS_RtXfhDrxNOst7i-7qg080J2F2Qn6PKMJFw89UQ',
  },
};

//동일하지만 아래 형식을 더 선호 => const SCREEN_HEIGHT = Dimensions.get("window").height;
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);

  const getTrending = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/trending/movie/week?language=en-US',
      options,
    );
    const data = await response.json();
    const results = data.results.filter(
      (movie) => !movie.genre_ids.includes(27),
    ); // 호러 장르 제외
    console.log(results); // 결과 출력

    setTrending(results); // results를 상태에 저장
  };

  const getUpcoming = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&region=KR',
      options,
    );
    const data = await response.json();
    const results = data.results.filter(
      (movie) => !movie.genre_ids.includes(27),
    ); // 호러 장르 제외
    console.log(results); // 결과 출력

    setUpcoming(results); // results를 상태에 저장
  };

  const getNowPlaying = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=KR',
      options,
    );
    const data = await response.json();
    const results = data.results.filter(
      (movie) => !movie.genre_ids.includes(27),
    ); // 호러 장르 제외
    console.log(results); // 결과 출력

    setNowPlaying(results); // results를 상태에 저장
  };

  const getData = async () => {
    await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
        {nowPlaying.map((movie) => (
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
          data={trending}
          keyExtractor={(item) => item.id + ''} // number에서 string으로 변환
          ItemSeparatorComponent={() => (
            //마지막 요소 빼고 적용함
            <View style={{ width: 20 }} />
          )}
          renderItem={({ item }) => (
            <VMedia
              posterPath={item.poster_path}
              originalTitle={item.original_title}
              voteAverage={item.vote_average}
            />
          )}
        />
      </ListContainer>
      <ComingSoonTitle>Coming Soon</ComingSoonTitle>
      {upcoming.map((movie) => (
        <HMedia
          key={movie.id}
          posterPath={movie.poster_path}
          originalTitle={movie.original_title}
          releaseDate={movie.release_date}
          overview={movie.overview}
        />
      ))}
    </ScrollView>
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
  margin-bottom: 32px;
`;

export default Movies;
