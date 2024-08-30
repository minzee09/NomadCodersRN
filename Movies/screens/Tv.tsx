import { tvApi } from '@/api';
import HList, { HListSeparator } from '@/components/HList';
import Loader from '@/components/Loader';
import VMedia from '@/components/VMedia';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, RefreshControl } from 'react-native';

const Tv = () => {
  const [refresh, setRefresh] = useState(false);
  const {
    isLoading: todayLoading,
    data: todayData,
    isFetching: todayRefetching,
  } = useQuery({
    queryKey: ['tv', 'today'],
    queryFn: tvApi.airingToday,
  });
  const {
    isLoading: topLoading,
    data: topData,
    isFetching: topRefetching,
  } = useQuery({
    queryKey: ['tv', 'top'],
    queryFn: tvApi.topRated,
  });
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isFetching: trendingRefetching,
  } = useQuery({
    queryKey: ['tv', 'trending'],
    queryFn: tvApi.trending,
  });

  const queryClient = useQueryClient();
  const onRefresh = async () => {
    setRefresh(true);
    await queryClient.refetchQueries({ queryKey: ['tv'] });
    setRefresh(false);
  };

  const loading = todayLoading || topLoading || trendingLoading;

  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingVertical: 30 }}
    >
      <HList title="Trending TV" data={trendingData} />
      <HList title={'Airing Today'} data={todayData} />
      <HList title="Top Rated TV" data={topData} />
    </ScrollView>
  );
};
export default Tv;
