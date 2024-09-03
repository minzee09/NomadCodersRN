import { Movie, TV, moviesApi, tvApi } from '@/api';
import Poster from '@/components/Poster';
import { makeImgPath } from '@/utilities/utils';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Linking,
  Touchable,
  Share,
  TouchableOpacity,
  Platform,
} from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BLACK_COLOR } from '@/colors';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as WebBrowser from 'expo-web-browser';

type RootStackParamList = {
  Detail: Movie | TV;
};
type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const shareMedia = async () => {
    const isAndroid = Platform.OS === 'android';
    const homepage = isMovie
      ? `https://www.imdb.com/title/${data.imdb_id}`
      : data.homepage;
    if (isAndroid) {
      await Share.share({
        title:
          'original_title' in params
            ? params.original_title
            : params.original_name,
        message: `${params.overview}\nCheck it Out! ${homepage}`,
      });
    } else {
      await Share.share({
        title:
          'original_title' in params
            ? params.original_title
            : params.original_name,
        url: homepage,
      });
    }
  };
  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons name="share-outline" color="white" size={24} />
    </TouchableOpacity>
  );
  const isMovie = 'original_title' in params;
  const { isLoading, data } = useQuery({
    queryKey: [isMovie ? 'movies' : 'tv', params.id],
    queryFn: isMovie ? moviesApi.detail : tvApi.detail,
  });

  useEffect(() => {
    setOptions({
      title: 'original_title' in params ? 'Movie' : 'Tv Show',
      headerRight: () => <ShareButton />,
      headerTitleAlign: 'center',
    });
  }, []);
  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <ShareButton />,
      });
    }
  }, [data]);

  const openYTLink = async (videoID: string) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoID}`;
    // await Linking.openURL(baseUrl); // 외부 브라우저 혹은 유튜브 앱으로 이동
    await WebBrowser.openBrowserAsync(baseUrl); // 앱 내 브라우저로 사용
  };
  return (
    <Container>
      <Header>
        <Background
          source={{ uri: makeImgPath(params.backdrop_path || '') }}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          colors={['transparent', BLACK_COLOR]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ''} />
          <Title>
            {'original_title' in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Data>
        <Overview>{params.overview}</Overview>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map((video) => (
          <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
            <Ionicons name="logo-youtube" color="white" size={24} />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
`;

const Title = styled.Text`
  flex-shrink: 1;
  color: white;
  font-size: 36px;
  align-self: flex-end;
  margin-left: 15px;
  font-weight: 500;
`;

const Data = styled.View`
  padding: 0 20px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin: 20px 0;
`;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;

const BtnText = styled.Text`
  color: white;
  font-weight: 500;
  margin-bottom: 12px;
  line-height: 24px;
  margin-left: 12px;
`;

export default Detail;
