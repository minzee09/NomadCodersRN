import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, RefreshControl } from 'react-native'; //Dimensions => 화면의 사이즈 가져다 줌
import Swiper from 'react-native-web-swiper';
import styled from 'styled-components/native';
import Slide from '@/components/Slide';
import Poster from '@/components/Poster';

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
          contentContainerStyle={{ paddingLeft: 32 }}
        >
          {trending.map((movie) => (
            <Movie key={movie.id}>
              <Poster path={movie.poster_path} />
              <Title>
                {movie.original_title.slice(0, 12)}
                {movie.original_title.length > 12 ? '...' : null}
              </Title>
              <Votes>⭐ {movie.vote_average.toFixed(1)}/10</Votes>
            </Movie>
          ))}
        </TrendingScroll>
      </ListContainer>
      <ComingSoonTitle>Coming Soon</ComingSoonTitle>
      {upcoming.map((movie) => (
        <HMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <HColumn>
            <Title>{movie.original_title}</Title>
            <Release>
              {new Date(movie.release_date).toLocaleDateString('ko', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Release>
            <Overview>{movie.overview.slice(0, 100)}...</Overview>
          </HColumn>
        </HMovie>
      ))}
    </ScrollView>
  );
};
const ScrollView = styled.ScrollView``;

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

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const Title = styled.Text`
  font-weight: 600;
  color: white;
  margin: 8px 0 4px 0;
`;

const Votes = styled.Text`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.8);
`;

const HMovie = styled.View`
  padding: 0 32px;
  margin-bottom: 16px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 16px;
  width: 80%;
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

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 32px;
`;

export default Movies;
