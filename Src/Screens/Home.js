import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
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

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const ShimmerView = () => {
  <View style={styles.mainPostShimmer}>
    <View style={styles.upperPostShimmer}>
      {/* postheader */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* avatar+name close */}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <ShimmerPlaceHolder style={styles.avatarShimmer} />
          <ShimmerPlaceHolder style={styles.nameShimmer} />
        </View>
        <ShimmerPlaceHolder style={{ width: responsiveWidth(2.5), height: responsiveHeight(3) }} />
      </View>
      {/* post description section */}
      <View>
        {/* <Text style={styles.description}>{post.postData.item.description}</Text> */}
        <ShimmerPlaceHolder style={styles.descriptionShimmer} />
      </View>
      {/* video section */}
      <ShimmerPlaceHolder style={styles.postImageShimmer} />
    </View>

  </View>
}



const Home = ({ navigation }) => {

  const userState = useSelector((state) => state.userInfo.userInfo)
  // console.log("user state from home",userState)
  // const [accessToken, setAccessToken] = useState('');
  // const [refreshToken, setRefreshToken] = useState('');

  const dispatch = useDispatch()



  const { data, error, isLoading } = useGetPostListQuery({ token: userState.accessToken });
 
  useEffect(() => {
    async function getToken() {
      try {
        var data = await getUserData()
        if (data) {
          data = JSON.parse(data)
          dispatch(setUserInfo(data))
        }

      } catch (error) {
        console.error('Error checking token:', error);
      }
    } getToken()

  }, [])




  const nav = useNavigation()
  useLayoutEffect(() => {
    nav.setOptions({ headertitle: "" })
  }, [])
  return (
    <SafeAreaView>
      <TouchableOpacity  onPress={() => navigation.navigate('CreatePostScreen')}>
        <View style={{ flexDirection: 'row', margin: responsiveWidth(2) }}>
          <View style={{ backgroundColor: 'white', padding: responsiveWidth(2), borderTopLeftRadius: responsiveWidth(3), borderBottomLeftRadius: responsiveWidth(3) }}>
            <MaterialIcons name='post-add' size={responsiveWidth(9)} color="#73788B" />
          </View>
          <View style={{ flex: 1, padding: responsiveWidth(4), backgroundColor: '#03bafc', borderTopRightRadius: responsiveWidth(3), borderBottomRightRadius: responsiveWidth(3), justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveWidth(4), color: 'white', fontWeight: 'bold' }}>Create Post</Text>
          </View>
        </View>
      </TouchableOpacity>
      {/* {console.log(data)} */}
    {data? 
    <FlatList
    style={styles.feed}
    data={data}
    renderItem={(post,index) =>
      <PostCard postData={post} key={index} navigation={navigation} isLoading={isLoading} />
    }
    keyExtractor={item => item.id}
    showsVerticalScrollIndicator={false}
  ></FlatList>
  :
  <FlatList
    style={styles.feed}
    data={[1,1,1,1,]}
    renderItem={() =>
        <PostShimmer/>
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
    marginHorizontal: responsiveWidth(3)
  }
});

export default Home