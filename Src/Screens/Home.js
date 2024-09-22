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



  const { data1, error, isLoading } = useGetPostListQuery({ token: userState.accessToken });
 const data=[
  {
      "id": 21,
      "upvote_count": 0,
      "downvote_count": 0,
      "donors_count": 0,
      "report_count": 0,
      "comment_count": 0,
      "is_upvoted": false,
      "is_downvoted": false,
      "slug": "gguzcb3vayymyz2nzviq4u5afuytuc",
      "post_type": "masjid",
      "need": "donation",
      "seeker": "Zafar Iqbal",
      "description": "Zafar, a young man, is looking for help to buy books and supplies to continue his education, as his family is unable to afford them.",
      "address": "Mohallah Raza, Qambar, Sindh",
      "verified": 0,
      "paid": 0,
      "needed_money": 3423423,
      "satisfied": false,
      "created": "2024-09-21T16:27:10.471556+05:00",
      "updated": "2024-09-21T16:27:53.231606+05:00",
      "for_staff": true,
      "creator": "abuubaida01"
  },
  {
      "id": 20,
      "upvote_count": 0,
      "downvote_count": 0,
      "donors_count": 0,
      "report_count": 0,
      "comment_count": 0,
      "is_upvoted": false,
      "is_downvoted": false,
      "slug": "mitqwsfrjlyp40fl6i6ealgaqv5ezc",
      "post_type": "masjid",
      "need": "help",
      "seeker": "Nasreen Fatima",
      "description": "Nasreen is seeking assistance for food and sanitation as her village has been cut off from relief aid.",
      "address": "Village Kachha, Sargodha, Punjab",
      "verified": 0,
      "paid": 0,
      "needed_money": 3242342,
      "satisfied": false,
      "created": "2024-09-21T16:26:07.942297+05:00",
      "updated": "2024-09-21T16:28:03.354656+05:00",
      "for_staff": true,
      "creator": "abuubaida01"
  },
  {
      "id": 19,
      "upvote_count": 0,
      "downvote_count": 0,
      "donors_count": 0,
      "report_count": 0,
      "comment_count": 0,
      "is_upvoted": false,
      "is_downvoted": false,
      "slug": "cin2jt6txz7hkztowjntexu6pridbz",
      "post_type": "madrasa",
      "need": "zakat",
      "seeker": "Waqas Ali",
      "description": "Waqas needs support for vocational training to improve his skills and find better job opportunities.",
      "address": "House 88, Street 7, Charsadda, Khyber Pakhtunkhwa",
      "verified": 0,
      "paid": 0,
      "needed_money": 3424332,
      "satisfied": false,
      "created": "2024-09-21T16:25:03.771131+05:00",
      "updated": "2024-09-21T16:28:14.745133+05:00",
      "for_staff": true,
      "creator": "abuubaida01"
  },
  {
      "id": 18,
      "upvote_count": 0,
      "downvote_count": 0,
      "donors_count": 0,
      "report_count": 0,
      "comment_count": 0,
      "is_upvoted": false,
      "is_downvoted": false,
      "slug": "0zgfaplyzbgu5egdiiphnaddajdylk",
      "post_type": "person",
      "need": "zakat",
      "seeker": "Rabia Qureshi",
      "description": "Rabia is a widow trying to provide for her three children with no steady income, relying on charitable donations.",
      "address": "Village Chakar, Jhang, Punjab",
      "verified": 0,
      "paid": 0,
      "needed_money": 3242322,
      "satisfied": false,
      "created": "2024-09-21T16:23:53.034812+05:00",
      "updated": "2024-09-21T16:28:25.169759+05:00",
      "for_staff": true,
      "creator": "abuubaida01"
  },
  {
      "id": 17,
      "upvote_count": 0,
      "downvote_count": 0,
      "donors_count": 0,
      "report_count": 0,
      "comment_count": 0,
      "is_upvoted": false,
      "is_downvoted": false,
      "slug": "xws8qktal8po0s3usp2li9eg5icmff",
      "post_type": "masjid",
      "need": "zakat",
      "seeker": "Jamil Ahmad",
      "description": "Jamil, a daily wage laborer, is struggling to feed his family due to lack of work opportunities in his area.",
      "address": "Mohallah Latif, Larkana, Sindh",
      "verified": 0,
      "paid": 0,
      "needed_money": 234332,
      "satisfied": false,
      "created": "2024-09-21T16:22:40.210748+05:00",
      "updated": "2024-09-21T16:28:43.805231+05:00",
      "for_staff": true,
      "creator": "abuubaida01"
  },
  {
      "id": 16,
      "upvote_count": 0,
      "downvote_count": 0,
      "donors_count": 0,
      "report_count": 0,
      "comment_count": 0,
      "is_upvoted": false,
      "is_downvoted": false,
      "slug": "jqnftrsjvr6zjio1shiitk7pa9leca",
      "post_type": "madrasa",
      "need": "zakat",
      "seeker": "Amina Shah",
      "description": ": Amina has been displaced due to local conflicts and is in need of shelter and basic supplies.",
      "address": "Street 6, Tehsil Kabal, Swat",
      "verified": 0,
      "paid": 0,
      "needed_money": 234233,
      "satisfied": false,
      "created": "2024-09-21T16:21:38.241107+05:00",
      "updated": "2024-09-21T16:28:55.880220+05:00",
      "for_staff": true,
      "creator": "abuubaida01"
  },
  {
      "id": 15,
      "upvote_count": 0,
      "downvote_count": 0,
      "donors_count": 0,
      "report_count": 0,
      "comment_count": 0,
      "is_upvoted": false,
      "is_downvoted": false,
      "slug": "uahq1czezcowjbpljbspicnydlttav",
      "post_type": "ngo",
      "need": "donation",
      "seeker": "Arif Khan",
      "description": "Arif is struggling to cover medical expenses for his wife, who needs urgent treatment for a chronic illness.",
      "address": "Near Railway Station, Jacobabad, Sindh",
      "verified": 0,
      "paid": 0,
      "needed_money": 3242333,
      "satisfied": false,
      "created": "2024-09-21T16:20:34.500781+05:00",
      "updated": "2024-09-21T16:29:08.795285+05:00",
      "for_staff": true,
      "creator": "abuubaida01"
  },
  {
      "id": 14,
      "upvote_count": 1,
      "downvote_count": 0,
      "donors_count": 0,
      "report_count": 0,
      "comment_count": 3,
      "is_upvoted": false,
      "is_downvoted": false,
      "slug": "c7hgnu9lpigf4zaam7vlfcqunhyqb0",
      "post_type": "madrasa",
      "need": "zakat",
      "seeker": "Farzana Malik",
      "description": "Farzana is seeking assistance for her children’s education as there are no schools in her village.",
      "address": "Village Kharian, Dera Ghazi Khan, Punjab",
      "verified": 0,
      "paid": 0,
      "needed_money": 3242343,
      "satisfied": false,
      "created": "2024-09-21T16:18:59.919315+05:00",
      "updated": "2024-09-21T16:29:18.877227+05:00",
      "for_staff": true,
      "creator": "abuubaida01"
  },
  {
      "id": 13,
      "upvote_count": 2,
      "downvote_count": 0,
      "donors_count": 0,
      "report_count": 0,
      "comment_count": 0,
      "is_upvoted": true,
      "is_downvoted": false,
      "slug": "oospcfsluiuummr8ej8whibwlpbo7h",
      "post_type": "madrasa",
      "need": "donation",
      "seeker": "Bilal Hussain",
      "description": "Bilal is a farmer facing severe crop failure due to drought, making it hard for him to sustain his family.",
      "address": "Mohallah Khokhar, Muzaffargarh, Punjab",
      "verified": 0,
      "paid": 0,
      "needed_money": 234234,
      "satisfied": false,
      "created": "2024-09-21T16:17:35.566897+05:00",
      "updated": "2024-09-21T16:29:50.472626+05:00",
      "for_staff": true,
      "creator": "abuubaida01"
  },
  {
      "id": 12,
      "upvote_count": 0,
      "downvote_count": 1,
      "donors_count": 0,
      "report_count": 0,
      "comment_count": 1,
      "is_upvoted": false,
      "is_downvoted": false,
      "slug": "8pr3f1biwveqmkqnxph8nsjyobpoes",
      "post_type": "masjid",
      "need": "donation",
      "seeker": "Shahida Bibi",
      "description": "Shahida struggles to provide basic food and education for her five children, as her husband is unable to work due to health issues.",
      "address": "House 45, Street 12, Sanghar, Sindh",
      "verified": 0,
      "paid": 0,
      "needed_money": 12123123,
      "satisfied": false,
      "created": "2024-09-21T16:16:11.468048+05:00",
      "updated": "2024-09-21T16:30:00.876954+05:00",
      "for_staff": true,
      "creator": "abuubaida01"
  }
]
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