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

// const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

// const ShimmerView = () => {
//   <View style={styles.mainPostShimmer}>
//     <View style={styles.upperPostShimmer}>
//       {/* postheader */}
//       <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//         {/* avatar+name close */}
//         <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
//           <ShimmerPlaceHolder style={styles.avatarShimmer} />
//           <ShimmerPlaceHolder style={styles.nameShimmer} />
//         </View>
//         <ShimmerPlaceHolder style={{ width: responsiveWidth(2.5), height: responsiveHeight(3) }} />
//       </View>
//       {/* post description section */}
//       <View>
//         {/* <Text style={styles.description}>{post.postData.item.description}</Text> */}
//         <ShimmerPlaceHolder style={styles.descriptionShimmer} />
//       </View>
//       {/* video section */}
//       <ShimmerPlaceHolder style={styles.postImageShimmer} />
//     </View>

//   </View>
// }



const Home = ({ navigation }) => {

  const userState = useSelector((state) => state.userInfo.userInfo)
  // console.log("user state from home",userState)
  // const [accessToken, setAccessToken] = useState('');
  // const [refreshToken, setRefreshToken] = useState('');

  const dispatch = useDispatch()



  const { data, error, isLoading } = useGetPostListQuery({ token: userState.accessToken });
  // isLoading?console.log('waiting'):console.log(data.results)
  
 
 
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
    <SafeAreaView style={{backgroundColor:'white'}}>
      <View style={{ flexDirection: 'row', margin: responsiveWidth(2),alignItems:'center'}}>
      <View style={{ width: responsiveWidth(10),height: responsiveWidth(10),borderRadius: responsiveWidth(5),marginRight: responsiveWidth(3),backgroundColor: 'gray'}}></View>
      <TouchableOpacity onPress={() => navigation.navigate('CreatePostScreen')}>  
      <Text style={{backgroundColor:'#F0F2F5',fontSize:responsiveWidth(5),padding:responsiveWidth(2),width:responsiveWidth(70),borderRadius:responsiveWidth(10),paddingHorizontal:responsiveWidth(5),marginRight:responsiveWidth(3)}}>Share your hardships...</Text>    
      </TouchableOpacity>
      <TouchableOpacity style={{transform: [{ translateY: -3 }]}}onPress={() => navigation.navigate('CreatePostScreen')}>    
        <MaterialIcons name='post-add' size={responsiveWidth(10)} color="#73788B" />
      </TouchableOpacity>
    </View>
      {/* {console.log(data)} */}
    {data? 
    <FlatList
    style={styles.feed}
    data={data.results}
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
    
  }
});

export default Home