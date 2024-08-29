import { makeImgPath } from '@/utilities/utils';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  useColorScheme,
} from 'react-native'; //Dimensions => 화면의 사이즈 가져다 줌
import Swiper from 'react-native-web-swiper';
import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGMxNmU3ZWY4YTI1OWIxYjU1ZjRhYzg4N2ExZGNjMyIsIm5iZiI6MTcyNDk1MDExMS4yMjM4ODUsInN1YiI6IjY2ZDBhNThmYzcxYjc1YzllZDcwNTA0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EmIS_RtXfhDrxNOst7i-7qg080J2F2Qn6PKMJFw89UQ',
  },
};

const ScrollView = styled.ScrollView``;

const View = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BgImg = styled.Image``;

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;
const Overview = styled.Text`
  margin-top: 8px;
  color: rgba(255, 255, 255, 0.8);
`;
const Votes = styled(Overview)`
  font-size: 12px;
`;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  width: 50%;
  margin-left: 16px;
`;

//동일하지만 아래 형식을 더 선호 => const SCREEN_HEIGHT = Dimensions.get("window").height;
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const isDark = useColorScheme() === 'dark';
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
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
    setLoading(false); // 로딩 종료
  };

  useEffect(() => {
    getNowPlaying();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <ScrollView>
      <Swiper
        loop
        timeout={2}
        controlsEnabled={false}
        containerStyle={{ width: '100%', height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map((movie) => (
          <View key={movie.id}>
            <BgImg
              source={{ uri: makeImgPath(movie.backdrop_path) }}
              blurRadius={5}
              style={StyleSheet.absoluteFill} // width: 100%, height: 100%, position: absolute과 동일함
            />
            <BlurView
              tint={isDark ? 'dark' : 'light'}
              experimentalBlurMethod="none"
              style={StyleSheet.absoluteFill}
            >
              <Wrapper>
                <Poster source={{ uri: makeImgPath(movie.poster_path) }} />
                <Column>
                  <Title>{movie.original_title}</Title>
                  <Votes>⭐ {movie.vote_average.toFixed(1)}/10</Votes>
                  <Overview>{movie.overview.slice(0, 100)}...</Overview>
                </Column>
              </Wrapper>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </ScrollView>
  );
};
export default Movies;
