import { View, Text, StyleSheet,Animated, FlatList, Button, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { getAccessToken, getRefreshToken, getUserData } from '../store/localStore'
import { useCreatePostMutation, useGetPostListQuery } from '../Api/Posts'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { setUserInfo } from '../Slices/UserSlice'
import PostCard from '../Components/PostCard'
import PostShimmer from '../Components/PostShimmer'
import { useInfiniteQuery } from '@tanstack/react-query'
import tailwind from 'tailwind-rn';




const Home = ({ navigation }) => {

  const userState = useSelector((state) => state.userInfo.userInfo)
  // console.log("user state from home",userState)
  // const [accessToken, setAccessToken] = useState('');
  // const [refreshToken, setRefreshToken] = useState('');

  const dispatch = useDispatch()
  const token = userState.accessToken

  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const direction = useRef('up'); // Track scroll direction
  
  // Smoothly hide and show the search bar based on scroll position
  const translateY = scrollY.interpolate({
    inputRange: [0, 100], // Adjust this range to control the speed of the hide/show effect
    outputRange: [0, -responsiveHeight(9)], // Adjust -100 based on the height of your search bar
    extrapolate: 'clamp',
  });

  // Handle the scroll event
  const handleScroll = (event) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    
    // Determine the scroll direction
    if (currentScrollY > lastScrollY.current) {
      // Scrolling down
      if (direction.current !== 'down') {
        direction.current = 'down';
        Animated.timing(scrollY, {
          toValue: 100, // Hide the search bar
          duration: 350,
          useNativeDriver: true,
        }).start();
      }
    } else if (currentScrollY < lastScrollY.current) {
      // Scrolling up
      if (direction.current !== 'up') {
        direction.current = 'up';
        Animated.timing(scrollY, {
          toValue: 0, // Show the search bar
          duration: 350,
          useNativeDriver: true,
        }).start();
      }
    }

    lastScrollY.current = currentScrollY;
  };
  // const { data, error, isLoading } = useGetPostListQuery({ token: userState.accessToken });
  // isLoading?console.log('waiting'):console.log(data.results)
  const fetchPosts = async ({ pageParam = 1 }) => {
    const response = await fetch(`https://api.addazakat.com/post/get-posts/?page=${pageParam}`, {
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
    queryKey: ['posts'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => lastPage?.next ? lastPage.next : undefined,
  });


  useEffect(() => {
    async function getToken() {

      try {
        let data = await getUserData()
        if (data) {
          data = JSON.parse(data)
          dispatch(setUserInfo(data))
        }

      } catch (error) {
        console.error('Error checking token:', error);
      }
    } getToken()

  }, [])




  // const nav = useNavigation()
  // useLayoutEffect(() => {
  //   nav.setOptions({ headertitle: "" })
  // }, [])
  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>

      <Animated.View style={{ transform:[{translateY}],zIndex:1,position:'absolute',top:0,left:0,right:0,flexDirection: 'row', alignItems: 'center',padding:responsiveWidth(2),paddingVertical:responsiveWidth(2) ,backgroundColor:'white'}}>
        <View style={{ width: responsiveWidth(10), height: responsiveWidth(10), borderRadius: responsiveWidth(5), marginRight: responsiveWidth(3), backgroundColor: 'gray' }}></View>
        <TouchableOpacity onPress={() => navigation.navigate('CreatePostScreen')}>
          <Text style={{ backgroundColor: '#F0F2F5', fontSize: responsiveWidth(5), padding: responsiveWidth(2), width: responsiveWidth(70), borderRadius: responsiveWidth(10), paddingHorizontal: responsiveWidth(5), marginRight: responsiveWidth(3) }}>Share your hardships...</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ transform: [{ translateY: -3 }] }} onPress={() => navigation.navigate('CreatePostScreen')}>
          <MaterialIcons name='post-add' size={responsiveWidth(10)} color="#73788B" />
        </TouchableOpacity>
      </Animated.View>
      {/* {console.log(data)} */}

      {data ? data.pages.map((page, pageIndex) => {
        return (
          <FlatList
            style={styles.feed}
            key={pageIndex}
            data={page.results}
            renderItem={(post) => {
              return (
                <PostCard postData={post} key={post.index} navigation={navigation} isLoading={isLoading} />
              ) || <Text key={pageIndex}>No posts available</Text>
            }}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll} // Bind the scroll event to Animated.event
            scrollEventThrottle={10} // Throttle scroll events to improve performance
          ></FlatList>
        )
      })

        :
        <FlatList
          style={styles.feed}
          data={[1, 1, 1, 1,]}
          renderItem={() =>
            <PostShimmer />
          }

          showsVerticalScrollIndicator={false}
        ></FlatList>




      }








    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBECF4"
  },
  feed: {
    paddingTop:responsiveHeight(9)
  }
});

export default Home