import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useInfiniteQuery } from '@tanstack/react-query';
import PostCard from '../Components/PostCard';
import PostShimmer from '../Components/PostShimmer';
import { useSelector } from 'react-redux';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


const Saved = ({navigation}) => {
  const userState = useSelector((state) => state.userInfo.userInfo)
  const token = userState.accessToken

  const fetchPosts = async ({ pageParam = 1 }) => {
    const response = await fetch(`https://api.addazakat.com/post/get-user-save-posts/?page=${pageParam}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    return data;

  };
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['savedPosts'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => lastPage?.next ? lastPage.next : undefined,
  });





  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <FlatList
            style={styles.feed}
            data={data ? data.pages.flatMap((page) => page.results) : [1, 1, 1, 1]} // Conditionally set data
  renderItem={({ item, index }) => {
    if (data) {
      return (
        <PostCard
          postData={item}
          key={index}
          navigation={navigation}
          isLoading={isLoading}
        />
      );
    } else {
      // Render shimmer for loading state
      return <PostShimmer key={index} />;
    }
  }}
            showsVerticalScrollIndicator={false}
            // onScroll={handleScroll} // Bind the scroll event to Animated.event
            scrollEventThrottle={10} // Throttle scroll events to improve performance
            ListFooterComponent=
              { hasNextPage ? (
      <TouchableOpacity 
        style={{ alignSelf:'center',backgroundColor: 'black',alignItems:'center',justifyContent:'center',borderRadius:responsiveWidth(6), padding: 10, width:responsiveWidth(40),alignItems: 'center',margin:30, marginBottom: 90 }} 
        onPress={fetchNextPage} 
        disabled={isFetchingNextPage}
      >
        <Text style={{ color: 'white' }}>
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </Text>
      </TouchableOpacity>
    ) : null
        }
          ></FlatList>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBECF4"
  },
  feed: {
    // paddingTop:responsiveHeight(9)
  }
});

export default Saved